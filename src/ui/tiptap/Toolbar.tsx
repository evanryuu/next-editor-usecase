'use client'

import { BubbleMenu, type Editor } from '@tiptap/react'
import { Bold, Strikethrough, Italic, List, ListOrdered, Heading2, Heading1, Heading3, Heading4 } from 'lucide-react'
import { Toggle } from '@/ui/toggle'
import { KeyboardEventHandler, useState } from 'react'
import { getUrlFromString } from '@/shared/url'
import { LinkSelector, LinkSelectorProps } from './BubbleMenu/LinkSelector'
import { createPortal } from 'react-dom'
import { useAppStore } from '@/store'

interface Props {
  editor?: Editor
}

const Toolbar: React.FC<Props> = ({ editor }) => {
  const [linkOpen, setLinkOpen] = useState(false)
  const { setHTML } = useAppStore()
  if (!editor) {
    return null
  }

  return (
    <div className="border bg-transparent flex items-center">
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 3 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 4 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        <Heading4 className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('strike')} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('link')} onPressedChange={() => setLinkOpen(true)}>
        <i className="ri-link"></i>
      </Toggle>
      <span className="px-2">|</span>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
        <i className="ri-align-left"></i>
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
        <i className="ri-align-center"></i>
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
        <i className="ri-align-right"></i>
      </Toggle>
      <span className="px-2">|</span>
      <Toggle size="sm" onClick={() => setHTML(editor.getHTML())}>
        <i className="ri-preview"></i>
      </Toggle>
    </div>
  )
}

export default Toolbar
