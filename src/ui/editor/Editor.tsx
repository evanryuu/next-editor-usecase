'use client'

import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useDebounceFn } from 'ahooks'
import { useCompletion } from 'ai/react'
import { useTranslations } from 'next-intl'
import Placeholder from '@tiptap/extension-placeholder'
import { Editor as EditorType } from '@tiptap/core'
import { Transaction } from '@tiptap/pm/state'
import { useEditor, EditorContent, EditorProvider } from '@tiptap/react'
import { toast } from 'sonner'

import { cn } from '@/utils/cn'
import { defaultExtensions } from './extensions'
import Toolbar from './components/Toolbar/Toolbar'
import TiptapBubbleMenu from './components/BubbleMenu'
import { ImageResizer } from './components/ImageResizer'
import { LinkActionsMenu } from './components/LinkAction/LinkActionsMenu'
import FloatingLinkEditMenu from './components/FloatingLinkEditMenu'
import FloatingTableMenu from './components/FloatingTableMenu'
import { defaultEditorProps } from './props'
import { getPrevText } from './lib/editor'
import { NovelContext } from './provider'
// import va from '@vercel/analytics'

import './editor.css'
import './article.css'

interface TiptapProps {
  html?: string
  className?: string
  editorClassName?: string
  editable?: boolean
  initialContent: string
  onChange?: (tr: Transaction, editor: EditorType) => void
}
const Editor: React.FC<TiptapProps> = (props) => {
  const t = useTranslations('writing')
  const { completionApi } = useContext(NovelContext)
  const [isLinkEditMode, setIsLinkEditMode] = useState(false)

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
        // va.track('Rate Limit Reached')
      }
    },
  })

  const editor = useEditor({
    editorProps: {
      ...defaultEditorProps,
    },
    extensions: [
      ...defaultExtensions,
      Placeholder.configure({
        includeChildren: true,
        placeholder: ({ editor, node }) => {
          if (node.type.name === 'heading') {
            return t(`editor.heading.${node.attrs.level}`)
          } else if (editor.isActive('blockquote')) {
            return t('editor.placeholder.blockquote')
          } else if (editor.isActive('codeBlock')) {
            return t('editor.placeholder.codeblock')
          } else if (!['table'].some((type) => editor.isActive(type))) {
            // 数组中的模块不展示placeholder
            return t('editor.placeholder.default')
          }
          return ''
        },
      }),
    ],
    content: props.initialContent || '',
    autofocus: true,
    injectCSS: true,
    editable: props.editable || true,
    onUpdate: (e) => {
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
          })
        )
        // complete(e.editor.storage.markdown.getMarkdown());
        // va.track('Autocomplete Shortcut Used')
      }
    },
    onTransaction: ({ transaction, editor }) => {
      if (props.onChange) {
        props.onChange(transaction, editor)
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
    <div className={cn('aicoin-editor', props.className)}>
      {editor && <Toolbar editor={editor} setIsLinkEditMode={setIsLinkEditMode} />}
      {editor && <TiptapBubbleMenu editor={editor} />}
      {editor && <LinkActionsMenu editor={editor} />}
      {editor && <FloatingTableMenu editor={editor} />}
      {editor && (
        <FloatingLinkEditMenu editor={editor} isLinkEditMode={isLinkEditMode} setIsLinkEditMode={setIsLinkEditMode} />
      )}
      {editor?.isActive('image') && <ImageResizer editor={editor} />}
      <EditorContent className={props.editorClassName} editor={editor} />
    </div>
  )
}

export default Editor
