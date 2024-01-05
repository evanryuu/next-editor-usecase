import { mergeAttributes } from '@tiptap/core'
import Gapcursor from '@tiptap/extension-gapcursor'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { ReactNodeViewRenderer } from '@tiptap/react'
import TableInsertNode from './TableInsertNode'

const tableExtensions = [
  Table.extend({
    draggable: true,
    addNodeView: () => {
      return ReactNodeViewRenderer(TableInsertNode)
    },
  }).configure({
    resizable: true,
  }),
  Gapcursor,
  TableRow,
  TableHeader.extend({
    renderHTML({ HTMLAttributes }) {
      const attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)

      if (attrs.colwidth) {
        attrs.style = `width: ${attrs.colwidth}px`
      }

      return ['th', attrs, 0]
    },
  }),
  TableCell.extend({
    renderHTML({ HTMLAttributes }) {
      const attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)

      if (attrs.colwidth) {
        attrs.style = `width: ${attrs.colwidth}px`
      }

      return ['td', attrs, 0]
    },
  }),
]

export { tableExtensions, tableExtensions as default }
