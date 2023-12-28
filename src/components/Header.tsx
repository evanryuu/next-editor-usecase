'use client'

import { useAppStore } from '@/store'
import { useEffect } from 'react'

const Header: React.FC = () => {
  const { editor, setEditor } = useAppStore()

  useEffect(() => {
    let editor = 'react-quill'
    const state = JSON.parse(localStorage.getItem('app-store') || '')
    setEditor(state.state.editor || editor)
  }, [])

  return (
    <div className="flex bg-neutral-800 text-white border-2">
      <button
        className={`hover:text-cyan-200 transition-all mr-2 ${editor === 'react-quill' && 'text-cyan-400'}`}
        onClick={() => setEditor('react-quill')}
      >
        React-quill
      </button>
      <button
        className={`hover:text-cyan-200  transition-all mr-2 ${editor === 'tiptap' && 'text-cyan-400'}`}
        onClick={() => setEditor('tiptap')}
      >
        Tiptap
      </button>
      <button
        className={`hover:text-cyan-200  transition-all mr-2 ${editor === 'lexical' && 'text-cyan-400'}`}
        onClick={() => setEditor('lexical')}
      >
        Lexical
      </button>
      <button
        className={`hover:text-cyan-200 text-neutral-600  transition-all mr-2 ${editor === 'slate' && 'text-cyan-400'}`}
        onClick={() => setEditor('slate')}
      >
        Slate
      </button>
      <button
        className={`hover:text-cyan-200 text-neutral-600  transition-all ${editor === 'novel' && 'text-cyan-400'}`}
        onClick={() => setEditor('novel')}
      >
        Novel
      </button>
    </div>
  )
}

export default Header
