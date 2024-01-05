'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Toolbar from './extensions/Toolbar/Toolbar'
import TiptapBubbleMenu from './extensions/BubbleMenu'
import './ProseMirror.css'
import { useAppStore } from '@/store'
import { useDebounceFn, useRafInterval } from 'ahooks'
import { ImageResizer } from './extensions/ImageResizer'
import { defaultEditorProps } from './props'
import { defaultExtensions } from './extensions'
import { getPrevText } from './lib/editor'
import { useContext, useEffect, useRef, useState } from 'react'
import { useCompletion } from 'ai/react'
import { NovelContext } from './provider'
import { toast } from 'sonner'
import va from '@vercel/analytics'
import LinkHoverMenu from './extensions/FloatingLinkEditMenu'
import { LinkActionsMenu } from './extensions/LinkAction/LinkActionsMenu'
import FloatingLinkEditMenu from './extensions/FloatingLinkEditMenu'

// import Heading from '@tiptap/extension-heading'

interface TiptapProps {
  html?: string
  className?: string
  editorClassName?: string
  onChange?: (str: string) => void
}
const Tiptap: React.FC<TiptapProps> = (props) => {
  const { html, setHTML } = useAppStore()
  const { completionApi } = useContext(NovelContext)
  const [isLinkEditMode, setIsLinkEditMode] = useState(false)
  const debounceSetHTML = useDebounceFn((fn: () => string) => Promise.resolve().then(() => setHTML(fn())), { wait: 350 })

  const { complete, completion, isLoading, stop } = useCompletion({
    id: 'novel',
    api: completionApi,
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      })
    },
    onError: (err) => {
      toast.error(err.message)
      if (err.message === 'You have reached your request limit for the day.') {
        va.track('Rate Limit Reached')
      }
    },
  })

  const editor = useEditor({
    editorProps: {
      ...defaultEditorProps,
    },
    extensions: [...defaultExtensions],
    content: props.html || '',
    autofocus: true,
    injectCSS: false,
    editable: true,
    onUpdate: (e) => {
      debounceSetHTML.run(e.editor.getHTML.bind(e.editor))
      const selection = e.editor.state.selection
      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      })
      if (lastTwo === '++' && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        })
        complete(
          getPrevText(e.editor, {
            chars: 5000,
          }),
        )
        // complete(e.editor.storage.markdown.getMarkdown());
        va.track('Autocomplete Shortcut Used')
      }
    },
  })
  const prev = useRef('')

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length)
    prev.current = completion
    editor?.commands.insertContent(diff)
  }, [isLoading, editor, completion])

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {}
    const mousedownHandler = (e: MouseEvent) => {}
    if (isLoading) {
      document.addEventListener('keydown', onKeyDown)
      window.addEventListener('mousedown', mousedownHandler)
    } else {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', mousedownHandler)
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', mousedownHandler)
    }
  }, [stop, isLoading, editor, complete, completion.length])
  return (
    <div className={props.className}>
      {editor && <Toolbar editor={editor} setIsLinkEditMode={setIsLinkEditMode} />}
      {editor && <TiptapBubbleMenu editor={editor} />}
      {editor && <LinkActionsMenu editor={editor} />}
      {editor && <FloatingLinkEditMenu editor={editor} isLinkEditMode={isLinkEditMode} setIsLinkEditMode={setIsLinkEditMode} />}
      {editor?.isActive('image') && <ImageResizer editor={editor} />}
      <EditorContent className={props.editorClassName} editor={editor} />
    </div>
  )
}

export default Tiptap
