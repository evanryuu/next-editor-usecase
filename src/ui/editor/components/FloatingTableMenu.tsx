import { FloatingMenu } from '@tiptap/react'
import { Editor } from '@tiptap/react'
import { Menu } from 'lucide-react'
import { useRef, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { BubbleMenuItem } from './BubbleMenu'
import { useClickAway } from 'ahooks'

const FloatingTableMenu = ({ editor }: { editor: Editor }) => {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const items: Omit<BubbleMenuItem, 'isActive'>[] = [
    {
      name: 'Add Column Right',
      icon: null,
      command: () => editor.chain().focus().addColumnAfter().run(),
    },
    {
      name: 'Add Column Left',
      icon: null,
      command: () => editor.chain().focus().addColumnBefore().run(),
    },
    {
      name: 'Add Row Below',
      icon: null,
      command: () => editor.chain().focus().addRowAfter().run(),
    },
    {
      name: 'Add Row Above',
      icon: null,
      command: () => editor.chain().focus().addRowBefore().run(),
    },
    {
      name: 'Delete Column',
      icon: null,
      command: () => editor.chain().focus().deleteColumn().run(),
    },
    {
      name: 'Delete Row',
      icon: null,
      command: () => editor.chain().focus().deleteRow().run(),
    },
    {
      name: 'Delete Table',
      icon: null,
      command: () => editor.chain().focus().deleteTable().run(),
    },
  ]

  useClickAway(() => {
    setIsOpen(false)
  }, popoverRef.current)

  return (
    <FloatingMenu
      className="bubble-menu-light"
      tippyOptions={{ duration: 150, placement: 'top', zIndex: 13 }}
      editor={editor}
      shouldShow={({ editor }) => {
        // only show the floating menu for table.
        return editor.isActive('table')
      }}
    >
      <Popover.Root open={isOpen}>
        <div className="relative flex h-full items-center justify-center bg-2">
          <Popover.Trigger
            className="flex h-full items-center gap-1 rounded-md p-1 text-sm font-medium transition-colors hover:bg-stone-100 active:bg-stone-200 dark:hover:bg-stone-700 dark:active:bg-stone-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="rounded-sm border" onClick={() => setIsOpen(true)} role="presentation">
              <Menu className="h-4 w-4" />
            </div>
          </Popover.Trigger>

          <Popover.Content
            ref={popoverRef}
            align="start"
            className="animate-in fade-in slide-in-from-top-1 z-[9] my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl"
          >
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.command()
                  setIsOpen(false)
                }}
                className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
                type="button"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2"> {item.icon && <item.icon className="h-3 w-3" />}</div>
                  <span>{item.name}</span>
                </div>
              </button>
            ))}
          </Popover.Content>
        </div>
      </Popover.Root>
    </FloatingMenu>
  )
}

export default FloatingTableMenu
