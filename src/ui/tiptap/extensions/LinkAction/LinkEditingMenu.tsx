import * as React from 'react'
import type { Editor } from '@tiptap/react'
import { ToolbarButton } from './ToolbarButton'
import { CheckCheck, DoorClosed, Edit, View } from 'lucide-react'
import { getUrlFromString } from '@/shared/url'

export interface LinkEditingMenu {
  linkUrl: string
  setLinkUrl: React.Dispatch<React.SetStateAction<string>>
  editor: Editor
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
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
    setLinkUrl('')
    setIsEditing(false)
  }
  return (
    <div className="flex items-center p-1">
      <input
        id="edit-link-url"
        className="p-2"
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

      <button color="success" onClick={changeUrl}>
        <CheckCheck />
      </button>

      <button color="error" onClick={close}>
        <DoorClosed />
      </button>
    </div>
  )
}
