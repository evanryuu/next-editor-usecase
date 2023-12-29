import { $getRoot, $getSelection, EditorState, LexicalEditor } from 'lexical'
import { useEffect } from 'react'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { EditorProps } from '@/types'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'

const theme = {
  // Theme styling goes here
  // ...
}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState, editor: LexicalEditor) {
  return new Promise<string>((resolve) => {
    editor.update(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot()
      const selection = $getSelection()
      const htmlString = $generateHtmlFromNodes(editor, null)
      console.log(root, selection, htmlString)
      resolve(htmlString)
    })
  })
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
function onError(error: Error) {
  console.error(error)
}

const Lexical: React.FC<EditorProps> = (props) => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  }

  // const parser = new DOMParser()
  // const dom = parser.parseFromString(props.html || '', 'text/html')

  const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
    onChange(editorState, editor).then((html: string) => {
      if (props.onChange) {
        props.onChange(html)
      }
    })
  }
  return (
    <div className={props.className}>
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>This is a placeholder</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={handleChange} />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
      </LexicalComposer>
    </div>
  )
}

export default Lexical
