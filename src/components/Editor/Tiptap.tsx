'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'

interface TiptapProps {
  html?: string
  className?: string
  onChange?: (str: string) => void
}
const Tiptap: React.FC<TiptapProps> = ({ className }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure(), Document, Paragraph, Text, Heading],
    content: '<p>Hello World! 🌎️</p>',
    autofocus: true,
    editable: true,
    onUpdate: (e) => {
      console.log(e, e.editor.getHTML())
    },
  })

  const handleChange = (str: any) => {
    console.log(str)
  }

  return (
    <div className={className}>
      <EditorContent editor={editor} onChange={handleChange} />
    </div>
  )
}

export default Tiptap
