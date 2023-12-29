'use client'

import ReactQuillEditor from '@/ui/quill/ReactQuillEditor'
import Preview from '@/components/Preview'
import { EditorType, useAppStore } from '@/store'
import React, { useCallback, useEffect } from 'react'

const ReactQuillEditorMemo = React.memo(ReactQuillEditor)

export default function Page() {
  const { html, setHTML: setDefaultHTML } = useAppStore()

  const handleChange = useCallback((str: string) => {
    setDefaultHTML(str)
  }, [])

  useEffect(() => {
    let html = ''
    const json = localStorage.getItem('app-store')
    setDefaultHTML(json ? JSON.parse(json).state.html : html)
  }, [])
  return (
    <div className="h-[100vh] flex">
      <ReactQuillEditorMemo html={html} className="h-full flex-1" onChange={handleChange} />
      <Preview className="flex-1 max-sm:hidden" html={html} />
    </div>
  )
}
