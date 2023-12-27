// Import React dependencies.
import { EditorProps } from '@/types'
import React, { useState } from 'react'
// Import the Slate editor factory.
import { Descendant, createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const SlateEditor: React.FC<EditorProps> = ({ className }) => {
  const [editor] = useState(() => withReact(createEditor()))
  return (
    <div className={className}>
      {/* // Add the editable component inside the context. */}
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          onKeyUp={(e) => console.log(e)}
          onKeyDown={(event) => {
            if (event.key === '&') {
              // Prevent the ampersand character from being inserted.
              event.preventDefault()
              // Execute the `insertText` method when the event occurs.
              editor.insertText('and')
            }
          }}
        />
      </Slate>
    </div>
  )
}

export default SlateEditor
