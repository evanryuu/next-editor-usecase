'use client'

import Preview from '@/components/Preview'
import { useAppStore } from '@/store'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
const TiptapEditor = dynamic(() => import('@/ui/tiptap/Editor'), { ssr: false })
export default function Page() {
  const { editor, html, setHTML: setDefaultHTML } = useAppStore()

  const handleChange = useCallback((str: string) => {
    setDefaultHTML(str)
  }, [])
  return (
    <div className="h-[100vh] flex">
      <TiptapEditor html={html} className="flex-1 h-full" onChange={handleChange} />
      <Preview className="flex-1" html={html} />
    </div>
  )
}
