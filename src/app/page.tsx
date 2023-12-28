'use client'

import Novel from '@/components/Editor/Novel'
// import QuillEditor from '@/components/Editor/Quill'
import ReactQuillEditor from '@/components/Editor/ReactQuillEditor'
// import SlateEditor from '@/components/Editor/Slate'
// import Tiptap from '@/components/Editor/Tiptap'
import Preview from '@/components/Preview'
import { EditorType, useAppStore } from '@/store'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const TiptapNoSSR = dynamic(() => import('@/components/Editor/Tiptap/index'), { ssr: false })
const SlateEditor = dynamic(() => import('@/components/Editor/Slate'), { ssr: false })
const LexicalEditor = dynamic(() => import('@/components/Editor/Lexical'), { ssr: false })

const TiptapNoSSRMemo = React.memo(TiptapNoSSR)
const SlateEditorMemo = React.memo(SlateEditor)
const LexicalEditorMemo = React.memo(LexicalEditor)

const ReactQuillEditorMemo = React.memo(ReactQuillEditor)
const NovelMemo = React.memo(Novel)

export default function Page() {
  const { editor, html, setHTML: setDefaultHTML } = useAppStore()

  const handleChange = useCallback((str: string) => {
    setDefaultHTML(str)
  }, [])

  useEffect(() => {
    let html = ''
    const state = JSON.parse(localStorage.getItem('app-store') || '')
    setDefaultHTML(state.state.html || html)
  }, [])

  const editorMap: Record<EditorType, React.ReactNode> = {
    'react-quill': <ReactQuillEditorMemo html={html} className="h-full" onChange={handleChange} />,
    'novel': <NovelMemo html={html} className="!max-w-none" onChange={handleChange} />,
    'tiptap': <TiptapNoSSRMemo html={html} onChange={handleChange} />,
    'slate': <SlateEditorMemo html={html} className="w-1/2" onChange={handleChange} />,
    'lexical': <LexicalEditorMemo html={html} className="w-1/2" onChange={handleChange} />,
  }

  return (
    <div className="min-h-[100vh] flex">
      <div className="bg-white w-1/2">{editorMap[editor]}</div>
      <Preview className="w-1/2" html={html} />
    </div>
  )
}
