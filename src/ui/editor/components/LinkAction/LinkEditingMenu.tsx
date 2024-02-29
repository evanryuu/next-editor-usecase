import * as React from 'react'
import type { Editor } from '@tiptap/react'
import { Check, Trash, Undo2, View, XCircle } from 'lucide-react'
import { getUrlFromString } from '@/utils/url'

export interface LinkEditingMenu {
  linkUrl: string
  setLinkUrl: React.Dispatch<React.SetStateAction<string>>
  editor: Editor
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  close: React.Dispatch<React.SetStateAction<boolean>>
}

export const LinkEditingMenu = (props: LinkEditingMenu) => {
  const { linkUrl, setLinkUrl, editor, setIsEditing } = props
  const changeUrl = () => {
    setIsEditing(false)
    setLinkUrl(getUrlFromString(linkUrl || '') as string)
    setTimeout(() => {
      editor
        .chain()
        .extendMarkRange('link')
        .updateAttributes('link', { href: getUrlFromString(linkUrl || '') })
        .run()
    }, 0)
  }

  const close = () => {
    setIsEditing(false)
    props.close(true)
  }
  return (
    <div className="flex items-center border border-transparent transition-colors focus-within:border-blue-200">
      <input
        id="edit-link-url"
        className="!border-none text-sm !outline-none !ring-transparent"
        tabIndex={1}
        value={linkUrl}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            changeUrl()
          } else if (e.code === 'Escapse') {
            close()
          }
        }}
        onChange={(e) => {
          setLinkUrl(e.target.value as string)
        }}
      />

      <button
        className="flex items-center rounded-sm p-1 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={changeUrl}
      >
        <Check className="h-4 w-4" />
      </button>

      <button
        className="flex items-center rounded-sm p-1 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={close}
      >
        <Undo2 className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
        onClick={() => {
          editor.chain().focus().unsetLink().run()
          close()
        }}
      >
        <Trash className="h-4 w-4" />
      </button>
    </div>
  )
}
