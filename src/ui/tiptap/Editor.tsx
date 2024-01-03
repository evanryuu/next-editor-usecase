'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Toolbar from './Toolbar'
import TiptapBubbleMenu from './BubbleMenu/index'
import './ProseMirror.css'
import { useAppStore } from '@/store'
import { useDebounceFn, useRafInterval } from 'ahooks'
import { ImageResizer } from './extensions/ImageResizer'
import { defaultEditorProps } from './props'
import { defaultExtensions } from './extensions'

// import Heading from '@tiptap/extension-heading'

interface TiptapProps {
  html?: string
  className?: string
  editorClassName?: string
  onChange?: (str: string) => void
}
const Tiptap: React.FC<TiptapProps> = (props) => {
  const { html, setHTML } = useAppStore()
  const debounceSetHTML = useDebounceFn((fn: () => string) => Promise.resolve().then(() => setHTML(fn())), { wait: 350 })
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
    },
  })

  return (
    <div className={props.className}>
      {editor && <Toolbar editor={editor} />}
      {editor && <TiptapBubbleMenu editor={editor} />}
      {editor?.isActive('image') && <ImageResizer editor={editor} />}
      <EditorContent className={props.editorClassName} editor={editor} />
    </div>
  )
}

export default Tiptap
