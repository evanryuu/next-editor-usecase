'use client'
import { EditorProps } from '@/types'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef } from 'react'
import {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
// Quill.register('', '')

const ReactQuillEditor: React.FC<EditorProps> = (props) => {
  const value = useRef('')
  useEffect(() => {
    value.current = props.html || ''
  }, [])
  const handleChange = (str: string) => {
    if (props.onChange) {
      value.current = str
      props.onChange(str)
    }
  }

  return <ReactQuill className={props.className} theme="snow" value={props.html} onChange={handleChange} />
}

export default ReactQuillEditor
