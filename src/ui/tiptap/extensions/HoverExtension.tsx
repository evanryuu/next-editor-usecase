import { Extension } from '@tiptap/core'
import { Node } from '@tiptap/pm/model'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { ReactNodeViewRenderer } from '@tiptap/react'
import tippy, { Instance } from 'tippy.js'
let popup: Instance[] | null = null
function nodeDOMAtCoords(coords: { x: number; y: number }) {
  return document
    .elementsFromPoint(coords.x, coords.y)
    .find((elem: Element) => elem.parentElement?.matches?.('.ProseMirror') || elem.matches(['a', 'link'].join(', ')))
}

function linkHoverHandler(node: Element, n: Node) {
  if (!(node instanceof Element) || !node.matches('a')) {
    return
  }
  if (!popup) {
    popup = tippy('body', {
      getReferenceClientRect: node.getBoundingClientRect.bind(node),
      appendTo: () => document.body,
      interactive: true,
      // interactiveDebounce: 300,
      content: n?.marks?.[0]?.attrs?.href,
    })
  }
}

export const HoverExtension = Extension.create({
  name: 'hover',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('hover'),
        props: {
          handleDOMEvents: {
            mouseover(view, e) {
              if (e && e.target && e.target instanceof Element) {
                const node = nodeDOMAtCoords({
                  x: e.clientX,
                  y: e.clientY,
                })!
                const pos = view.posAtDOM(e.target, 0)
                const n = view.state.doc.nodeAt(pos)
                linkHoverHandler(node, n!)
              }
            },
          },
        },
      }),
    ]
  },
})
