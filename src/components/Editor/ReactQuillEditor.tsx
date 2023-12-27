'use client'
import { EditorProps } from '@/types'
import dynamic from 'next/dynamic'
import React, { useRef } from 'react'

import 'react-quill/dist/quill.snow.css'

const ReactQuillEditor: React.FC<EditorProps> = ({ onChange, className }) => {
  const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
  const value = useRef('')
  console.log('render')
  const handleChange = (str: string) => {
    console.log(str)
    if (onChange) {
      value.current = str
      onChange(str)
    }
  }

  return <ReactQuill className={className} theme="snow" value={value.current} onChange={handleChange} />
}

export default ReactQuillEditor
