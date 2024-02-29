import { mergeAttributes } from '@tiptap/core'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { ReactNodeViewRenderer } from '@tiptap/react'

const tableExtensions = [
  Table.extend({
    draggable: true,
  }).configure({
    resizable: true,
  }),
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
