import { Editor } from '@tiptap/core'
import { ALargeSmall, Check, ChevronDown } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'
import * as Popover from '@radix-ui/react-popover'

interface FontSizeSelectorProps {
  editor: Editor
  isOpen: boolean
  setIsOpen: (bool: boolean) => void
}

const FONT_SIZES: (string | number)[] = Array(20)
  .fill(0)
  .map((_, i) => i * 2 + 14)

FONT_SIZES.unshift('DEFAULT')

export const FontSizeSelector: FC<FontSizeSelectorProps> = ({ editor, isOpen, setIsOpen }) => {
  const activeFontSize = FONT_SIZES.find((fontSize) => editor.isActive('textStyle', { fontSize }))

  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full">
        <Popover.Trigger
          className="flex h-full items-center gap-1 rounded-md p-1 text-sm font-medium transition-colors hover:bg-stone-100 active:bg-stone-200 dark:hover:bg-stone-700 dark:active:bg-stone-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ALargeSmall className="h-4 w-4" />
          <span className="line-clamp-1 w-[60px] rounded-sm px-1">{activeFontSize || 'Default'}</span>

          <ChevronDown className="h-4 w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="animate-in fade-in slide-in-from-top-1 z-[99999] my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl"
        >
          <div className="my-1 px-2 text-xs font-semibold text-stone-500">FONT SIZE</div>
          {FONT_SIZES.map((fontSize, index) => (
            <button
              key={index}
              onClick={() => {
                if (fontSize === 'DEFAULT') {
                  editor.chain().focus().unsetFontSize().run()
                } else {
                  editor.chain().focus().setFontSize(fontSize).run()
                }
                setIsOpen(false)
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <span>{fontSize}</span>
              </div>
              {editor.isActive('textStyle', { fontSize }) && <Check className="h-4 w-4" />}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  )
}
