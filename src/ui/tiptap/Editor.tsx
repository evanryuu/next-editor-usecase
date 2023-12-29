'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar'
// import Document from '@tiptap/extension-document'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
// import Heading from '@tiptap/extension-heading'

interface TiptapProps {
  html?: string
  className?: string
  onChange?: (str: string) => void
}
const Tiptap: React.FC<TiptapProps> = (props) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: props.html || '',
    autofocus: true,
    injectCSS: false,
    editable: true,
    onUpdate: (e) => {
      if (props.onChange) {
        props.onChange(e.editor.getHTML())
      }
    },
  })

  return (
    <div className={props.className}>
      <Toolbar editor={editor!} />
      <EditorContent className="h-full *:h-full" editor={editor} />
    </div>
  )
}

export default Tiptap
