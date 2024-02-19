import { BubbleMenu, BubbleMenuProps, Editor, isNodeSelection } from '@tiptap/react'
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, CodeIcon } from 'lucide-react'
import { NodeSelector } from './Toolbar/NodeSelector'
// import { ColorSelector } from './color-selector'
import { LinkSelector } from './Toolbar/LinkSelector'
import { cn } from '@/lib/utils'
import { TextColorSelector } from './Toolbar/TextColorSelector'
import { BgColorSelector } from './Toolbar/BgColorSelector'
import { InsertSelector } from './Toolbar/InsertSelector'
import { FontFamilySelector } from './Toolbar/FontFamilySelector'

export interface BubbleMenuItem {
  name: string
  isActive: () => boolean
  command: () => void
  icon: typeof BoldIcon
}

export interface TiptapBubbleMenuProps {
  editor: Editor
}

const EditorBubbleMenu: FC<TiptapBubbleMenuProps> = (props) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => props.editor.isActive('bold'),
      command: () => props.editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => props.editor.isActive('italic'),
      command: () => props.editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'strike',
      isActive: () => props.editor.isActive('strike'),
      command: () => props.editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: 'underline',
      isActive: () => props.editor.isActive('underline'),
      command: () => props.editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'code',
      isActive: () => props.editor.isActive('code'),
      command: () => props.editor.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ]

  const bubbleMenuProps: Omit<BubbleMenuProps, 'children'> = {
    ...props,
    shouldShow: ({ state, editor }) => {
      const { selection } = state
      const { empty } = selection

      // don't show bubble menu if:
      // - the selected node is an image
      // - the selection is empty
      // - the selection is a node selection (for drag handles)
      if (editor.isActive('image') || empty || isNodeSelection(selection) || editor.isActive('link') || editor.isActive('table')) {
        return false
      }
      return true
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
      onHidden: () => {
        setOpenMenu('')
      },
    },
  }

  const [openMenu, setOpenMenu] = useState('')

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl opacity-100 animate-fade-in"
      tippyOptions={{ onHidden: () => setOpenMenu('') }}
    >
      <NodeSelector editor={props.editor} isOpen={openMenu === 'node'} setIsOpen={() => setOpenMenu('node')} />
      <FontFamilySelector editor={props.editor} isOpen={openMenu === 'fontFamily'} setIsOpen={() => setOpenMenu('fontFamily')} />
      <div className="flex">
        {items.map((item, index) => (
          <button key={index} onClick={item.command} className="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200" type="button">
            <item.icon
              className={cn('h-4 w-4', {
                'text-blue-500': item.isActive(),
              })}
            />
          </button>
        ))}
        <LinkSelector editor={props.editor} isOpen={openMenu === 'link'} setIsOpen={() => setOpenMenu('link')} />
      </div>
      <TextColorSelector editor={props.editor} isOpen={openMenu === 'textColor'} setIsOpen={() => setOpenMenu('textColor')} />
      <BgColorSelector editor={props.editor} isOpen={openMenu === 'bgColor'} setIsOpen={() => setOpenMenu('bgColor')} />
      <InsertSelector editor={props.editor} isOpen={openMenu === 'insert'} setIsOpen={() => setOpenMenu('insert')} />
    </BubbleMenu>
  )
}

export default EditorBubbleMenu
