'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Toolbar from './Toolbar'
import TiptapBubbleMenu from './BubbleMenu/index'
import Link from '@tiptap/extension-link'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Code from '@tiptap/extension-code'
import Image from '@tiptap/extension-image'
import CustomImage from './plugins/customImage'

// import Heading from '@tiptap/extension-heading'

interface TiptapProps {
  html?: string
  className?: string
  onChange?: (str: string) => void
}
const Tiptap: React.FC<TiptapProps> = (props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      // Image.configure({
      //   allowBase64: true,
      // }),
      CustomImage,
      Document,
      Paragraph,
      Text,
      Code,
      Link.extend({
        inclusive: false, // 这样不会把link后面的空格也识别为链接
      }).configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
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
      {editor && <Toolbar editor={editor} />}
      {editor && <TiptapBubbleMenu editor={editor} />}
      <EditorContent className="h-full *:h-full *:p-4" editor={editor} />
    </div>
  )
}

export default Tiptap
