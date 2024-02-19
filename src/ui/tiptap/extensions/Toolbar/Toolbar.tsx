'use client'

import { type Editor } from '@tiptap/react'
import { Bold, Strikethrough, Italic, Underline, Code, Blocks, Code2 } from 'lucide-react'
import { Toggle } from '@/ui/toggle'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { NodeSelector } from './NodeSelector'
import { TextColorSelector } from './TextColorSelector'
import { BgColorSelector } from './BgColorSelector'
import { InsertSelector } from './InsertSelector'
import { useClickAway } from 'ahooks'
import { FontFamilySelector } from './FontFamilySelector'

interface Props {
  editor: Editor
  setIsLinkEditMode: Dispatch<SetStateAction<boolean>>
}

const Toolbar: React.FC<Props> = ({ editor }) => {
  const [linkOpen, setLinkOpen] = useState(false)
  const [inToolbar, setInToolbar] = useState(false)
  const [openMenu, setOpenMenu] = useState('')
  const toolbarRef = useRef<HTMLDivElement | null>(null)

  useClickAway(() => {
    if (inToolbar) {
      setOpenMenu('')
      setInToolbar(false)
    }
  }, [toolbarRef])

  useEffect(() => {}, [])

  if (!editor) {
    return null
  }

  return (
    <div className="border bg-transparent flex items-center py-1 px-2 flex-wrap" ref={toolbarRef} onClick={() => setInToolbar(true)}>
      <NodeSelector editor={editor} isOpen={openMenu === 'node'} setIsOpen={() => setOpenMenu('node')} />
      <span className="px-2 text-neutral-300">|</span>
      <FontFamilySelector editor={editor} isOpen={openMenu === 'fontFamily'} setIsOpen={() => setOpenMenu('fontFamily')} />
      <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('strike')} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('underline')} onPressedChange={() => editor.chain().focus().toggleUnderline().run()}>
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('code')} onPressedChange={() => editor.chain().focus().toggleCode().run()}>
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('codeBlock')} onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code2 className="h-4 w-4" />
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
      <TextColorSelector editor={editor} isOpen={openMenu === 'textColor'} setIsOpen={() => setOpenMenu('textColor')} />
      <BgColorSelector editor={editor} isOpen={openMenu === 'bgColor'} setIsOpen={() => setOpenMenu('bgColor')} />
      <span className="px-2 text-neutral-300">|</span>
      <InsertSelector editor={editor} isOpen={openMenu === 'insert'} setIsOpen={() => setOpenMenu('insert')} />
    </div>
  )
}

export default Toolbar
