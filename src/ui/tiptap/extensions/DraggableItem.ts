import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import DraggableNode from './DraggableNode'

const DraggableItem = Node.create({
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
    return ['section', mergeAttributes(HTMLAttributes, { 'data-type': 'draggable-item' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(DraggableNode)
  },
})

export { DraggableItem, DraggableItem as default }
