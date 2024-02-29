import { Editor } from '@tiptap/core'
import { Check, ChevronDown } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'
import * as Popover from '@radix-ui/react-popover'

export interface BubbleColorMenuItem {
  name: string
  color: string
}

interface ColorSelectorProps {
  editor: Editor
  isOpen: boolean
  setIsOpen: (bool: boolean) => void
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--black)',
  },
  // TODO: 之所以使用rgb而不是hex，是因为有些浏览器会特殊处理style中的颜色，自动转为rgb。期望之后将这些色值改为变量
  {
    name: 'Purple',
    color: 'rgb(147, 51, 234)',
  },
  {
    name: 'Red',
    color: 'rgb(224, 0, 0)',
  },
  {
    name: 'Yellow',
    color: 'rgb(234, 179, 8)',
  },
  {
    name: 'Blue',
    color: 'rgb(37, 99, 235)',
  },
  {
    name: 'Green',
    color: 'rgb(0, 138, 0)',
  },
  {
    name: 'Orange',
    color: 'rgb(255, 165, 0)',
  },
  {
    name: 'Pink',
    color: 'rgb(186, 64, 129)',
  },
  {
    name: 'Gray',
    color: 'rgb(168, 162, 158)',
  },
]

export const TextColorSelector: FC<ColorSelectorProps> = ({ editor, isOpen, setIsOpen }) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) => editor.isActive('textStyle', { color }))

  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full">
        <Popover.Trigger
          className="flex h-full items-center gap-1 rounded-md p-1 text-sm font-medium transition-colors hover:bg-stone-100 active:bg-stone-200 dark:hover:bg-stone-700 dark:active:bg-stone-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className="relative flex h-6 items-center rounded-sm px-1"
            style={{
              color: activeColorItem?.color,
            }}
          >
            A
            <span
              className="absolute bottom-0 left-1/2 block h-1 w-5 -translate-x-1/2 rounded-sm"
              style={{ backgroundColor: activeColorItem?.color }}
            ></span>
          </span>

          <ChevronDown className="h-4 w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="animate-in fade-in slide-in-from-top-1 z-[99999] my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl"
        >
          <div className="my-1 px-2 text-sm text-stone-500">Color</div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetColor()
                name !== 'Default' &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || '')
                    .run()
                setIsOpen(false)
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border border-stone-200 px-1 py-px font-medium" style={{ color }}>
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('textStyle', { color }) && <Check className="h-4 w-4" />}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  )
}
