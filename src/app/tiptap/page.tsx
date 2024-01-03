'use client'

import Preview from '@/components/Preview'
import { useAppStore } from '@/store'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
const TiptapEditor = dynamic(() => import('@/ui/tiptap/Editor'), { ssr: false })
export default function Page() {
  const { html } = useAppStore()

  return (
    <div className="min-h-[100vh] flex">
      <TiptapEditor editorClassName="py-8 px-12" className="flex-1 h-full" />
      <Preview className="flex-1 py-8 px-12" html={html} />
    </div>
  )
}
