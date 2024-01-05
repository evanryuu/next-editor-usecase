import { getUrlFromString } from '@/shared/url'
import { BubbleMenu, FloatingMenu } from '@tiptap/react'
import { Editor } from '@tiptap/react'
import { CheckCheck, Trash } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

const FloatingLinkEditMenu = ({
  editor,
  isLinkEditMode,
  setIsLinkEditMode,
}: {
  editor: Editor
  isLinkEditMode: boolean
  setIsLinkEditMode: Dispatch<SetStateAction<boolean>>
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const leave = useRef(false)

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus()
    leave.current = false
  })
  return (
    <FloatingMenu
      className="bubble-menu-light"
      tippyOptions={{ duration: 150 }}
      editor={editor}
      shouldShow={({ editor }) => {
        // only show the bubble menu for links.
        return isLinkEditMode
      }}
    >
      <form
        onKeyDownCapture={(e) => {
          if (e.code === 'Enter' || e.code === 'Escape') {
            leave.current = true
            console.log(e.code)
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          const input = e.currentTarget[0] as HTMLInputElement
          const url = getUrlFromString(input.value)
          url && editor.chain().focus().setLink({ href: url }).run()
        }}
        className="fixed top-full z-[99999] mt-1 flex w-60 overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Paste a link"
          className="flex-1 bg-white p-1 text-sm outline-none"
          defaultValue={editor.getAttributes('link').href || ''}
        />
        <button
          type="button"
          className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
          onClick={() => {
            editor.chain().focus().unsetLink().run()
          }}
        >
          <Trash className="h-4 w-4" />
        </button>
        {/* {editor.getAttributes('link').href ? (
          <button
            type="button"
            className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
            onClick={() => {
              editor.chain().focus().unsetLink().run()
              editor.chain().blur()
            }}
          >
            <Trash className="h-4 w-4" />
          </button>
        ) : (
          <button className="flex items-center rounded-sm p-1 text-stone-600 transition-all hover:bg-stone-100">
            <CheckCheck className="h-4 w-4" />
          </button>
        )} */}
      </form>
    </FloatingMenu>
  )
}

export default FloatingLinkEditMenu
