import StarterKit from '@tiptap/starter-kit'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import TiptapImage from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import TiptapUnderline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Markdown } from 'tiptap-markdown'
import Highlight from '@tiptap/extension-highlight'
import { InputRule, Node, mergeAttributes } from '@tiptap/core'
import SlashCommand from './SlashCommand'
import DragAndDrop from './DragAndDrop'
import CustomKeymap from './CustomKeymap'
import UploadImagesPlugin from '../plugins/upload-images'
import { CustomLink } from './CustomLink'
import { HoverExtension } from './HoverExtension'
import DraggableItem from './DraggableItem'
import Paragraph from '@tiptap/extension-paragraph'
import tableExtensions from './TableExtension'
import { FontSize } from './extension-font-size'
export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc list-outside leading-3',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal list-outside leading-3',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'leading-normal',
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-stone-400 text-stone-400',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800',
      },
    },
    code: {
      HTMLAttributes: {
        class: 'rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900',
        spellcheck: 'false',
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: '#DBEAFE',
      width: 4,
    },
    gapcursor: false,
  }),
  Paragraph.extend().configure({
    HTMLAttributes: {
      'data-type': 'draggable-item',
    },
  }),
  ...tableExtensions,
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {}

            const { tr } = state
            const start = range.from
            let end = range.to

            tr.insert(start - 1, this.type.create(attributes)).delete(tr.mapping.map(start), tr.mapping.map(end))
          },
        }),
      ]
    },
  }).configure({
    HTMLAttributes: {
      class: 'mt-4 mb-6 border-t border-stone-300',
    },
  }),
  CustomLink,
  // LinkHover,
  TiptapImage.extend({
    draggable: true,
    addAttributes() {
      return {
        ...this.parent?.(),
        width: {
          default: null,
        },
        height: {
          default: null,
        },
      }
    },
    addProseMirrorPlugins() {
      return [UploadImagesPlugin()]
    },
  }).configure({
    allowBase64: true,
    HTMLAttributes: {
      class: 'rounded-lg border border-stone-200',
    },
  }),
  Placeholder.configure({
    includeChildren: true,
    placeholder: ({ editor, node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`
      } else if (!editor.isActive('table')) {
        return "Press '/' for commands, or '++' for AI autocomplete..."
      }
      return ''
    },
  }),

  SlashCommand,
  TiptapUnderline,
  TextStyle,
  FontFamily,
  FontSize,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose pl-2',
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: 'flex items-start my-4',
    },
    nested: true,
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
    transformPastedText: true,
  }),
  CustomKeymap,
  // HoverExtension,
  DragAndDrop,
  // DraggableItem,
]
