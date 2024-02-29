import * as React from 'react'
import { Mark } from '@tiptap/pm/model'
import { LinkActionsPlugin, LinkActionsPluginProps } from './LinkActionsPlugin'
import { Edit, Eye } from 'lucide-react'
import { LinkEditingMenu } from './LinkEditingMenu'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type LinkActionsProps = Omit<Optional<LinkActionsPluginProps, 'pluginKey'>, 'element'> & {
  className?: string
  updateDelay?: number
}

export const LinkActionsMenu = (props: LinkActionsProps) => {
  const { editor, pluginKey = 'linkActions', tippyOptions = {}, updateDelay, shouldShow = null, className } = props

  const [element, setElement] = React.useState<HTMLDivElement | null>(null)
  const [isEditing, setIsEditing] = React.useState<boolean>(true)
  const [linkUrl, setLinkUrl] = React.useState<string>('')
  const [closeModal, setClose] = React.useState(false)

  React.useEffect(() => {
    if (!element) {
      return
    }

    if (editor.isDestroyed) {
      return
    }

    const plugin = LinkActionsPlugin({
      updateDelay,
      editor,
      element,
      pluginKey,
      shouldShow,
      tippyOptions,
    })

    editor.registerPlugin(plugin)
    return () => {
      editor.unregisterPlugin(pluginKey)
    }
    // Register plugin when the editor is ready or the element changes.
    // We don't want to consider other props changes as they are not
    // coming from a react state or ref, which makes the menu rendering
    // unstable and non-ending process.
  }, [editor, element])

  React.useEffect(() => {
    const { $from } = editor.state.selection
    const linkMark = $from.marks().find((mark: Mark) => mark.type.name === 'link')

    if (!linkMark) {
      setLinkUrl('')
    } else {
      setLinkUrl(linkMark.attrs.href as string)
    }

    return () => {
      setLinkUrl('')
      setIsEditing(false)
    }
  }, [editor.state.selection])

  if (isEditing) {
    return (
      <div ref={setElement} className={`${className} rounded-8xl overflow-hidden`}>
        <LinkEditingMenu
          editor={editor}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          setIsEditing={setIsEditing}
          close={setClose}
        />
      </div>
    )
  }

  if (closeModal) {
    setTimeout(() => setClose(false), 0)
    return <div ref={setElement}></div>
  }

  return (
    <div ref={setElement} className={`${className || 'p-2'}`}>
      <span className="pr-2 text-sm text-neutral-400">{linkUrl}</span>
      <button
        className="items-center rounded-sm p-1 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={() => {
          setLinkUrl(linkUrl || '')
          setIsEditing(true)
        }}
      >
        <Edit className="h-4 w-4" />
      </button>
      <button
        className="items-center rounded-sm p-1 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={() => {
          if (linkUrl) {
            window.open(linkUrl, '_blank')
          }
        }}
      >
        <Eye className="h-4 w-4" />
      </button>
    </div>
  )
}
