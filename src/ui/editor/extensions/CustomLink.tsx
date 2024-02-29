import { Mark, mergeAttributes } from '@tiptap/core'
import Link from '@tiptap/extension-link'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { BubbleMenu } from '@tiptap/react'
import tippy, { Instance } from 'tippy.js'
const CustomMark = Mark.create({
  name: 'customMark',

  // Your code goes here.
})
function nodeDOMAtCoords(coords: { x: number; y: number }) {
  return document
    .elementsFromPoint(coords.x, coords.y)
    .find((elem: Element) => elem.parentElement?.matches?.('.ProseMirror') || elem.matches(['a', 'link'].join(', ')))
}

function nodePosAtDOM(node: Element, view: EditorView) {
  const boundingRect = node.getBoundingClientRect()

  return view.posAtCoords({
    left: boundingRect.left + 1,
    top: boundingRect.top + 1,
  })?.inside
}
function linkHoverHandler() {
  let popup: Instance[] | null = null
  return new Plugin({
    key: new PluginKey('handleLinkHover'),
    view: (view) => {
      console.log(view?.dom?.parentElement)
      // view?.dom?.parentElement?.appendChild(dragHandleElement)

      return {
        destroy: () => {
          // dragHandleElement?.remove?.()
          // dragHandleElement = null
        },
      }
    },
    props: {
      // handleDOMEvents: (view, pos, event) => {
      //   var _a, _b
      //   if (event.button !== 0) {
      //     return false
      //   }
      //   const eventTarget = event.target
      //   if (!eventTarget) return false
      //   if ((eventTarget as HTMLElement).nodeName !== 'A') {
      //     return false
      //   }
      //   const attrs = getAttributes(view.state, options.type.name)
      //   const link = event.target
      //   const href = (_a = link === null || link === void 0 ? void 0 : link.href) !== null && _a !== void 0 ? _a : attrs.href
      //   const target = (_b = link === null || link === void 0 ? void 0 : link.target) !== null && _b !== void 0 ? _b : attrs.target
      //   if (link && href) {
      //     if (view.editable) {
      //       window.open(href, target)
      //     }
      //     return true
      //   }
      //   return false
      // },
    },
  })
}

export const CustomLink = Link.extend({
  inclusive: false,
  renderHTML: ({ HTMLAttributes, mark }) => {
    return ['a', mergeAttributes(HTMLAttributes, { 'data-link': mark.attrs.href || '' })]
  },
  // addProseMirrorPlugins() {
  //   return [linkHoverHandler()]
  // },
}).configure({
  openOnClick: false,
  autolink: true,
  HTMLAttributes: {
    class: 'text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer',
  },
})
