import { BubbleMenu, BubbleMenuProps, Editor, isNodeSelection } from '@tiptap/react'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, CodeIcon } from 'lucide-react'
import { NodeSelector } from './NodeSelector'
// import { ColorSelector } from './color-selector'
import { LinkSelector } from './LinkSelector'
import { cn } from '@/lib/utils'
import { TextColorSelector } from './TextColorSelector'
import { BgColorSelector } from './BgColorSelector'
import { InsertSelector } from './InsertSelector'

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
    // {
    //   name: 'underline',
    //   isActive: () => props.editor.isActive('underline'),
    //   command: () => props.editor.chain().focus().toggleUnderline().run(),
    //   icon: UnderlineIcon,
    // },
    {
      name: 'strike',
      isActive: () => props.editor.isActive('strike'),
      command: () => props.editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
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
        setThisOpen()
      },
    },
  }

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false)
  const [isTextColorSelectorOpen, setIsTextColorSelectorOpen] = useState(false)
  const [isBgColorSelectorOpen, setIsBgColorSelectorOpen] = useState(false)
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false)
  const [isInsertSelectorOpen, setIsInsertSelectorOpen] = useState(false)

  const setThisOpen = (state?: boolean, dispatch?: Dispatch<SetStateAction<boolean>>) => {
    const methods = [
      setIsNodeSelectorOpen,
      setIsTextColorSelectorOpen,
      setIsBgColorSelectorOpen,
      setIsLinkSelectorOpen,
      setIsInsertSelectorOpen,
    ]
    if (dispatch) {
      dispatch(!state)
    }
    methods.filter((fn) => fn !== dispatch).forEach((fn) => fn(false))
  }

  return (
    <BubbleMenu {...bubbleMenuProps} className="flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl">
      <NodeSelector
        editor={props.editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => setThisOpen(isNodeSelectorOpen, setIsNodeSelectorOpen)}
      />
      <LinkSelector
        editor={props.editor}
        isOpen={isLinkSelectorOpen}
        setIsOpen={() => setThisOpen(isLinkSelectorOpen, setIsLinkSelectorOpen)}
      />
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
      </div>
      <TextColorSelector
        editor={props.editor}
        isOpen={isTextColorSelectorOpen}
        setIsOpen={() => setThisOpen(isTextColorSelectorOpen, setIsTextColorSelectorOpen)}
      />
      <BgColorSelector
        editor={props.editor}
        isOpen={isBgColorSelectorOpen}
        setIsOpen={() => setThisOpen(isBgColorSelectorOpen, setIsBgColorSelectorOpen)}
      />
      <InsertSelector
        editor={props.editor}
        isOpen={isInsertSelectorOpen}
        setIsOpen={() => setThisOpen(isInsertSelectorOpen, setIsInsertSelectorOpen)}
      />
    </BubbleMenu>
  )
}

export default EditorBubbleMenu
