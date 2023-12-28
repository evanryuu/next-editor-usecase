'use client'

import { EditorProps } from '@/types'
import { Editor as EditorType } from '@tiptap/core'
import { Editor } from 'novel'

const Novel: React.FC<EditorProps> = (props) => {
  const handleChange = (data?: EditorType) => {
    console.log('handleChange', data?.getHTML())
    if (props.onChange && data) {
      props.onChange(data.getHTML())
    }
  }

  return <Editor className={props.className} defaultValue={props.html} onUpdate={handleChange} />
}
export default Novel
