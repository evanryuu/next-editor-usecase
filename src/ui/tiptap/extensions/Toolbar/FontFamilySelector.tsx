import { Editor } from '@tiptap/core'
import { Check, ChevronDown } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'
import * as Popover from '@radix-ui/react-popover'

interface MenuItem {
  name: string
  fontFamily: string
}

interface FontFamilySelector {
  editor: Editor
  isOpen: boolean
  setIsOpen: (bool: boolean) => void
}

const FONT_FAMILIES: MenuItem[] = [
  { name: 'Default', fontFamily: 'inherit' },
  { name: 'Arial', fontFamily: 'Arial' },
  { name: 'Courier New', fontFamily: 'Courier New' },
  { name: 'Georgia', fontFamily: 'Georgia' },
  { name: 'Times New Roman', fontFamily: 'Times New Roman' },
  { name: 'Trebuchet MS', fontFamily: 'Trebuchet MS' },
  { name: 'Verdana', fontFamily: 'Verdana' },
]

export const FontFamilySelector: FC<FontFamilySelector> = ({ editor, isOpen, setIsOpen }) => {
  const activeFontFamily = FONT_FAMILIES.find(({ fontFamily }) => editor.isActive('textStyle', { fontFamily: fontFamily }))

  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full w-[120px] truncate">
        <Popover.Trigger
          className="flex h-full items-center gap-1 p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className="rounded-sm px-1"
            style={{
              fontFamily: activeFontFamily?.fontFamily,
            }}
          >
            <i className="ri-text text-base mr-2"></i>
            {activeFontFamily?.name || 'Default'}
          </span>

          <ChevronDown className="h-4 w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="z-[99999] my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <div className="my-1 px-2 text-xs text-stone-500 font-semibold">FONT FAMILY</div>
          {FONT_FAMILIES.map(({ name, fontFamily }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.chain().focus().setFontFamily(fontFamily).run()
                setIsOpen(false)
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border border-stone-200 px-1 py-px font-medium" style={{ fontFamily }}>
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('textStyle', { fontFamily }) && <Check className="h-4 w-4" />}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  )
}
