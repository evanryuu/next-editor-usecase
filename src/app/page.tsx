'use client'

import Novel from '@/components/Editor/Novel'
// import QuillEditor from '@/components/Editor/Quill'
import ReactQuillEditor from '@/components/Editor/ReactQuillEditor'
// import SlateEditor from '@/components/Editor/Slate'
import Tiptap from '@/components/Editor/Tiptap'
import Preview from '@/components/Preview'
import { EditorType, useAppStore } from '@/store'
import React, { useCallback, useState } from 'react'

const ReactQuillEditorMemo = React.memo(ReactQuillEditor)

export default function Page() {
  const [html, setHTML] = useState('')
  const handleChange = useCallback(
    (str: string) => {
      console.log(str)
      setHTML(str)
    },
    [setHTML],
  )

  const { editor } = useAppStore()

  const editorMap: Record<EditorType, React.ReactNode> = {
    'react-quill': <ReactQuillEditorMemo className="h-full" onChange={handleChange} />,
    'novel': <Novel className="!max-w-none" />,
    'tiptap': <Tiptap onChange={handleChange} />,
    // 'slate': <SlateEditor className="w-1/2" onChange={handleChange} />,
  }

  return (
    <div className="min-h-[100vh] flex">
      <div className="bg-white w-1/2">{editorMap[editor]}</div>
      <Preview className="w-1/2" html={html} />
    </div>
  )
}
