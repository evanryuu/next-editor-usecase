import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Image from '@tiptap/extension-image'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { InputRule } from '@tiptap/core'
import { Markdown } from 'tiptap-markdown'

import SlashCommand from './SlashCommand'
import CustomKeymap from './CustomKeymap'
import UploadImagesPlugin from '../plugins/UploadImage'
import { CustomLink } from './CustomLink'
import tableExtensions from './TableExtension'
import { FontSize } from './FontSize'

export const defaultExtensions = [
  StarterKit.configure({
    code: {
      HTMLAttributes: {
        spellcheck: 'false',
      },
    },
    paragraph: false,
    heading: false,
    horizontalRule: false,
    dropcursor: {
      color: '#DBEAFE',
      width: 4,
    },
  }),
  Heading.extend({ draggable: true }),
  Paragraph.extend({ draggable: true }),
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
  }),
  CustomLink,
  Image.extend({
    draggable: true,
    addAttributes() {
      return {
        ...this.parent?.(),
        width: { default: null },
        height: { default: null },
      }
    },
    addProseMirrorPlugins() {
      return [UploadImagesPlugin()]
    },
  }).configure({
    allowBase64: true,
  }),
  SlashCommand,
  Underline,
  TextAlign.configure({
    types: ['paragraph', 'heading'],
  }),
  TextStyle,
  FontFamily,
  FontSize,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.extend({ draggable: true }),
  TaskItem.configure({
    nested: true,
  }),
  Markdown.configure({
    html: true,
    transformCopiedText: true,
    transformPastedText: true,
  }),
  CustomKeymap,
]
