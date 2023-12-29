'use client'

import Preview from '@/components/Preview'
import { EditorType, useAppStore } from '@/store'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect } from 'react'

const TiptapNoSSR = dynamic(() => import('@/ui/tiptap/index'), { ssr: false })

const TiptapNoSSRMemo = React.memo(TiptapNoSSR)

export default function Page() {
  const { editor, html, setHTML: setDefaultHTML } = useAppStore()

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
      <TiptapNoSSRMemo html={html} className="h-full flex-1" onChange={handleChange} />
      <Preview className="flex-1 max-sm:hidden" html={html} />
    </div>
  )
}
