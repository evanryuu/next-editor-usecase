'use client'

import Preview from '@/components/Preview'
import { EditorType, useAppStore } from '@/store'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
const LexicalEditor = dynamic(() => import('@/ui/lexical'), { ssr: false })

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
      <LexicalEditor className="flex-1  h-full border border-solid border-cyan-300" onChange={handleChange} />
      <Preview className="flex-1" html={html} />
    </div>
  )
}
