import { Extension } from '@tiptap/core'

declare module '@tiptap/core' {
  // eslint-disable-next-line no-unused-vars
  interface Commands<ReturnType> {
    customkeymap: {
      /**
       * Select text between node boundaries
       */
      selectTextWithinNodeBoundaries: () => ReturnType
    }
  }
}

const CustomKeymap = Extension.create({
  name: 'CustomKeymap',

  addCommands() {
    return {
      selectTextWithinNodeBoundaries:
        () =>
        ({ editor, commands }) => {
          const { state } = editor
          const { tr } = state
          const startNodePos = tr.selection.$from.start()
          const endNodePos = tr.selection.$to.end()
          return commands.setTextSelection({
            from: startNodePos,
            to: endNodePos,
          })
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-a': ({ editor }) => {
        const { state } = editor
        const { tr } = state
        const startSelectionPos = tr.selection.from
        const endSelectionPos = tr.selection.to
        const startNodePos = tr.selection.$from.start()
        const endNodePos = tr.selection.$to.end()
        const isCurrentTextSelectionNotExtendedToNodeBoundaries =
          startSelectionPos > startNodePos || endSelectionPos < endNodePos
        if (isCurrentTextSelectionNotExtendedToNodeBoundaries) {
          editor.chain().selectTextWithinNodeBoundaries().run()
          return true
        }
        return false
      },
      'Mod-k': ({ editor }) => {
        const { state } = editor
        const { tr } = state
        const startSelectionPos = tr.selection.from
        const endSelectionPos = tr.selection.to
        const startNodePos = tr.selection.$from.start()
        const endNodePos = tr.selection.$to.end()
        console.log('ok')
        editor.chain().focus().setLink({ href: 'baidu.com' }).run()
        return true
      },
      // https://github.com/ueberdosis/tiptap/issues/457#issuecomment-1221231841
      'Tab': () => {
        this.editor
          .chain()
          .sinkListItem('listItem')
          .command(({ tr }) => {
            tr.insertText(' ')
            return true
          })
          .run()

        return true // <- make sure to return true to prevent the tab from blurring.
      },
    }
  },
})

export default CustomKeymap
