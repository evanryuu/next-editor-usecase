'use client'

import { type Editor } from '@tiptap/react'
import {
  Bold,
  Strikethrough,
  Italic,
  Underline,
  Code,
  Code2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Quote,
} from 'lucide-react'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { NodeSelector } from './NodeSelector'
import { TextColorSelector } from './TextColorSelector'
import { BgColorSelector } from './BgColorSelector'
import { InsertSelector } from './InsertSelector'
import { useClickAway } from 'ahooks'
import { FontFamilySelector } from './FontFamilySelector'
import { FontSizeSelector } from './FontSizeSelector'
import { Toggle } from '../../ui/Toggle'

interface Props {
  editor: Editor
  setIsLinkEditMode: Dispatch<SetStateAction<boolean>>
}

const Toolbar: React.FC<Props> = ({ editor, setIsLinkEditMode }) => {
  const [inToolbar, setInToolbar] = useState(false)
  const [openedMenu, setOpenedMenu] = useState('')
  const toolbarRef = useRef<HTMLDivElement | null>(null)

  useClickAway(() => {
    if (inToolbar) {
      setOpenedMenu('')
      setInToolbar(false)
    }
  }, [toolbarRef])

  const setIsOpen = (bool: boolean, selector: string) => {
    if (bool) {
      setOpenedMenu(selector)
    } else {
      setOpenedMenu('')
    }
  }

  useEffect(() => {}, [])

  if (!editor) {
    return null
  }

  return (
    <div
      className="sticky top-[80px] z-[12] flex flex-wrap items-center gap-1 border-b bg-white px-2 py-1 dark:bg-[#25282b]"
      ref={toolbarRef}
      onClick={() => setInToolbar(true)}
    >
      <NodeSelector
        editor={editor}
        isOpen={openedMenu === 'node'}
        setIsOpen={(bool: boolean) => setIsOpen(bool, 'node')}
      />
      <span className="px-2 text-neutral-300">|</span>
      <FontFamilySelector
        editor={editor}
        isOpen={openedMenu === 'fontFamily'}
        setIsOpen={(bool: boolean) => setIsOpen(bool, 'fontFamily')}
      />
      <FontSizeSelector
        editor={editor}
        isOpen={openedMenu === 'fontSize'}
        setIsOpen={(bool: boolean) => setIsOpen(bool, 'fontSize')}
      />

      {/* S Text Style */}
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('code')}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      {/* TODO: 新文章页上线之后允许插入CodeBlock */}
      {/* <Toggle
        size="sm"
        pressed={editor.isActive('codeBlock')}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code2 className="h-4 w-4" />
      </Toggle> */}
      <Toggle
        size="sm"
        pressed={editor.isActive('link')}
        onPressedChange={() => {
          setIsLinkEditMode(true)
          editor.chain().focus().run()
        }}
      >
        <Link className="h-4 w-4" />
      </Toggle>

      {/* E Text Style */}

      {/* S Text Align */}
      <span className="px-2 text-neutral-300">|</span>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'left' })}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'center' })}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'right' })}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>
      {/* E Text Align */}

      <span className="px-2 text-neutral-300">|</span>
      <TextColorSelector
        editor={editor}
        isOpen={openedMenu === 'textColor'}
        setIsOpen={(bool: boolean) => setIsOpen(bool, 'textColor')}
      />
      <BgColorSelector
        editor={editor}
        isOpen={openedMenu === 'bgColor'}
        setIsOpen={(bool: boolean) => setIsOpen(bool, 'bgColor')}
      />
      {/* TODO: 新文章、预览页上线后允许插入Table */}
      {/* <span className="px-2 text-neutral-300">|</span>
      <InsertSelector
        editor={editor}
        isOpen={openedMenu === 'insert'}
        setIsOpen={(bool: boolean) => setIsOpen(bool, 'insert')}
      /> */}
    </div>
  )
}

export default Toolbar
