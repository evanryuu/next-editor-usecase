'use client'

import Preview from '@/components/Preview'
import { EditorType, useAppStore } from '@/store'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
const QuillEditor = dynamic(() => import('@/ui/quill/Editor'), { ssr: false })

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
    <div className="min-h-[100vh] flex">
      <QuillEditor html={html} className="w-1/2" onChange={handleChange} />
      <Preview className="w-1/2" html={html} />
    </div>
  )
}
