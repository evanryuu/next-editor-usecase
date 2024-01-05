import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import DraggableNode from './DraggableNode'

const LinkItem = Node.create({
  name: 'draggableItem',
  group: 'block',
  content: 'block+',
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'p[data-type="draggable-item"]',
        // tag: 'p',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(HTMLAttributes, { 'data-type': 'draggable-item' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(DraggableNode)
  },
})

export { LinkItem, LinkItem as default }
