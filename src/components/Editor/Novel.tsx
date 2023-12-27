import { EditorProps } from '@/types'
import { Editor as E } from '@tiptap/react'
import { Editor } from 'novel'

const Novel: React.FC<EditorProps> = ({ className, onChange }) => {
  const handleChange = (data?: E) => {
    console.log('handleChange', data)
  }

  return <Editor className={className} onDebouncedUpdate={handleChange} />
}
export default Novel
