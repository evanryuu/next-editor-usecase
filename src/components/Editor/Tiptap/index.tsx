// 'use client'

// import { EditorProps } from '@tiptap/pm/view'
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'

// const Tiptap: React.FC<{className?: string, onChange?: (data: any) => void}> = (props) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//     ],
//     content: '<p>Hello World! 🌎️</p>',
//   })

//   return (
//     <EditorContent className={props.className} editor={editor} />
//   )
// }

// export default Tiptap
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './tiptap.css'
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
      <EditorContent editor={editor}  />
    </div>
  )
}

export default Tiptap
