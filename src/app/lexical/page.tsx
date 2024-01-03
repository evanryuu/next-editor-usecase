'use client'

import Preview from '@/components/Preview'
import { EditorType, useAppStore } from '@/store'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
const LexicalEditor = dynamic(() => import('@/ui/lexical'), { ssr: false })

export default function Page() {
  const { html, setHTML: setDefaultHTML } = useAppStore()

  // const handleChange = useCallback((str: string) => {
  //   setDefaultHTML(str)
  // }, [])

  useEffect(() => {
    let html = ''
    setDefaultHTML(html)
  }, [])

  return (
    <div className="min-h-[100vh] flex justify-center">
      {/* <LexicalEditor className="flex-1  h-full border border-solid border-cyan-300" /> */}
      <LexicalEditor />
    </div>
  )
}
