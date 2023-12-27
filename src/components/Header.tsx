'use client'

import { useAppStore } from '@/store'
import { Menu } from '@headlessui/react'

const Header: React.FC = () => {
  const { editor, setEditor } = useAppStore()

  return (
    <div className="flex">
      <button className={`mr-2 ${editor === 'react-quill' && 'text-cyan-600'}`} onClick={() => setEditor('react-quill')}>
        React-quill
      </button>
      <button className={`mr-2 ${editor === 'tiptap' && 'text-cyan-600'}`} onClick={() => setEditor('tiptap')}>
        Tiptap
      </button>
      <button className={`mr-2 ${editor === 'slate' && 'text-cyan-600'}`} onClick={() => setEditor('slate')}>
        Slate
      </button>
      <button className={`${editor === 'novel' && 'text-cyan-600'}`} onClick={() => setEditor('novel')}>
        Novel
      </button>
    </div>
  )
}

export default Header
