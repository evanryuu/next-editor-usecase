'use client'

import { type Editor } from '@tiptap/react'
import { Bold, Strikethrough, Italic, Underline, Code, Blocks, Code2 } from 'lucide-react'
import { Toggle } from '@/ui/toggle'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { NodeSelector } from './BubbleMenu/NodeSelector'
import { TextColorSelector } from './BubbleMenu/TextColorSelector'
import { BgColorSelector } from './BubbleMenu/BgColorSelector'
import { InsertSelector } from './BubbleMenu/InsertSelector'
import { useClickAway } from 'ahooks'

interface Props {
  editor?: Editor
}

const Toolbar: React.FC<Props> = ({ editor }) => {
  const [linkOpen, setLinkOpen] = useState(false)
  const [inToolbar, setInToolbar] = useState(false)
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false)
  const [isTextColorSelectorOpen, setIsTextColorSelectorOpen] = useState(false)
  const [isBgColorSelectorOpen, setIsBgColorSelectorOpen] = useState(false)
  const [isInsertSelectorOpen, setIsInsertSelectorOpen] = useState(false)
  const toolbarRef = useRef<HTMLDivElement | null>(null)

  useClickAway(() => {
    if (inToolbar) {
      setThisOpen()
      setInToolbar(false)
    }
  }, [toolbarRef])

  const setThisOpen = (state?: boolean, dispatch?: Dispatch<SetStateAction<boolean>>) => {
    const methods = [setIsNodeSelectorOpen, setIsTextColorSelectorOpen, setIsBgColorSelectorOpen, setIsInsertSelectorOpen]
    if (dispatch) {
      dispatch(!state)
    }
    methods.filter((fn) => fn !== dispatch).forEach((fn) => fn(false))
  }

  if (!editor) {
    return null
  }

  return (
    <div className="border bg-transparent flex items-center py-1 px-2 flex-wrap" ref={toolbarRef} onClick={() => setInToolbar(true)}>
      <NodeSelector editor={editor} isOpen={isNodeSelectorOpen} setIsOpen={() => setThisOpen(isNodeSelectorOpen, setIsNodeSelectorOpen)} />
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
      <TextColorSelector
        editor={editor}
        isOpen={isTextColorSelectorOpen}
        setIsOpen={() => setThisOpen(isTextColorSelectorOpen, setIsTextColorSelectorOpen)}
      />
      <BgColorSelector
        editor={editor}
        isOpen={isBgColorSelectorOpen}
        setIsOpen={() => setThisOpen(isBgColorSelectorOpen, setIsBgColorSelectorOpen)}
      />
      <span className="px-2 text-neutral-300">|</span>
      <InsertSelector
        editor={editor}
        isOpen={isInsertSelectorOpen}
        setIsOpen={() => setThisOpen(isInsertSelectorOpen, setIsInsertSelectorOpen)}
      />
    </div>
  )
}

export default Toolbar
