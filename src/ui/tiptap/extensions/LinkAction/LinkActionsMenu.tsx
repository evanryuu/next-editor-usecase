import * as React from 'react'
import { Mark } from '@tiptap/pm/model'
import { LinkActionsPlugin, LinkActionsPluginProps } from './LinkActionsPlugin'
import { Edit, View } from 'lucide-react'
import { LinkEditingMenu } from './LinkEditingMenu'
import { Toggle } from '@/ui/toggle'

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
        <LinkEditingMenu editor={editor} linkUrl={linkUrl} setLinkUrl={setLinkUrl} setIsEditing={setIsEditing} close={setClose} />
      </div>
    )
  }

  if (closeModal) {
    setTimeout(() => setClose(false), 0)
    return <div ref={setElement}></div>
  }

  return (
    <div ref={setElement} className={`${className || 'px-2'}`}>
      <span className="text-neutral-400 pr-2 text-sm">{linkUrl}</span>
      <button
        className="items-center rounded-sm p-1 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={() => {
          setLinkUrl(linkUrl || '')
          setIsEditing(true)
        }}
      >
        <i className="ri-edit-line"></i>
      </button>
      <button
        className="items-center rounded-sm p-1 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={() => {
          if (linkUrl) {
            window.open(linkUrl, '_blank')
          }
        }}
      >
        <i className="ri-eye-line"></i>
      </button>
    </div>
  )
}
