'use client'

import { useAppStore } from '@/store'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Header: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const setEditor = (str: string) => {
    router.push(str)
  }

  return (
    <div className="flex bg-neutral-800 text-white border-2">
      <button
        className={`hover:text-cyan-200 transition-all mr-2 ${pathname === 'react-quill' && 'text-cyan-400'}`}
        onClick={() => setEditor('react-quill')}
      >
        React-quill
      </button>
      <button
        className={`hover:text-cyan-200  transition-all mr-2 ${pathname === 'tiptap' && 'text-cyan-400'}`}
        onClick={() => setEditor('tiptap')}
      >
        Tiptap
      </button>
      <button
        className={`hover:text-cyan-200  transition-all mr-2 ${pathname === 'lexical' && 'text-cyan-400'}`}
        onClick={() => setEditor('lexical')}
      >
        Lexical
      </button>
      <button
        className={`hover:text-cyan-200 text-neutral-600  transition-all mr-2 ${pathname === 'slate' && 'text-cyan-400'}`}
        onClick={() => setEditor('slate')}
      >
        Slate
      </button>
      <button
        className={`hover:text-cyan-200 text-neutral-600  transition-all ${pathname === 'novel' && 'text-cyan-400'}`}
        onClick={() => setEditor('novel')}
      >
        Novel
      </button>
    </div>
  )
}

export default Header
