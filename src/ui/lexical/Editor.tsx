import { $getRoot, $getSelection, EditorState } from 'lexical'
import { useEffect, useState } from 'react'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { EditorProps } from '@/types'

const theme = {
  // Theme styling goes here
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus()
  }, [editor])

  return null
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error): void {
  console.error(error)
}
const LexicalEditor: React.FC<EditorProps> = (props) => {
  const [editorState, setEditorState] = useState<EditorState>()
  function onChange(editorState: EditorState) {
    setEditorState(editorState)
  }
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  }

  return (
    <div className={props.className}>
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin contentEditable={<ContentEditable />} placeholder={<div>Enter some text...</div>} ErrorBoundary={LexicalErrorBoundary} />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
    </div>
  )
}

export default LexicalEditor
