'use client'

import { type Editor } from '@tiptap/react'
import { Bold, Strikethrough, Italic } from 'lucide-react'
import { Toggle } from '@/ui/toggle'
import { useState } from 'react'
import { NodeSelector } from './BubbleMenu/NodeSelector'
import { TextColorSelector } from './BubbleMenu/TextColorSelector'
import { BgColorSelector } from './BubbleMenu/BgColorSelector'

interface Props {
  editor?: Editor
}

const Toolbar: React.FC<Props> = ({ editor }) => {
  const [linkOpen, setLinkOpen] = useState(false)
  const [nodeOpen, setNodeOpen] = useState(false)
  const [isTextColorSelectorOpen, setIsTextColorSelectorOpen] = useState(false)
  const [isBgColorSelectorOpen, setIsBgColorSelectorOpen] = useState(false)

  if (!editor) {
    return null
  }

  return (
    <div className="border bg-transparent flex items-center py-1 px-2">
      <NodeSelector editor={editor} isOpen={nodeOpen} setIsOpen={setNodeOpen} />
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
      <span className="px-2 text-neutral-300">|</span>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
        <i className="ri-align-left"></i>
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
        <i className="ri-align-center"></i>
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
        <i className="ri-align-right"></i>
      </Toggle>
      <span className="px-2 text-neutral-300">|</span>
      <TextColorSelector
        editor={editor}
        isOpen={isTextColorSelectorOpen}
        setIsOpen={() => {
          setIsTextColorSelectorOpen(!isTextColorSelectorOpen)
          setIsBgColorSelectorOpen(false)
        }}
      />
      <BgColorSelector
        editor={editor}
        isOpen={isBgColorSelectorOpen}
        setIsOpen={() => {
          setIsBgColorSelectorOpen(!isBgColorSelectorOpen)
          setIsTextColorSelectorOpen(false)
        }}
      />
    </div>
  )
}

export default Toolbar
