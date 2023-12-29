/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin'
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import useLexicalEditable from '@lexical/react/useLexicalEditable'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { useSettings } from '@/context/lexical/SettingsContext'
import { useSharedHistoryContext } from '@/context/lexical/SharedHistoryContext'
import ActionsPlugin from '@/plugins/lexical/ActionsPlugin'
import AutocompletePlugin from '@/plugins/lexical/AutocompletePlugin'
import AutoEmbedPlugin from '@/plugins/lexical/AutoEmbedPlugin'
import AutoLinkPlugin from '@/plugins/lexical/AutoLinkPlugin'
import CodeActionMenuPlugin from '@/plugins/lexical/CodeActionMenuPlugin'
import CodeHighlightPlugin from '@/plugins/lexical/CodeHighlightPlugin'
import CollapsiblePlugin from '@/plugins/lexical/CollapsiblePlugin'
import CommentPlugin from '@/plugins/lexical/CommentPlugin'
import ComponentPickerPlugin from '@/plugins/lexical/ComponentPickerPlugin'
import ContextMenuPlugin from '@/plugins/lexical/ContextMenuPlugin'
import DragDropPaste from '@/plugins/lexical/DragDropPastePlugin'
import DraggableBlockPlugin from '@/plugins/lexical/DraggableBlockPlugin'
import EmojiPickerPlugin from '@/plugins/lexical/EmojiPickerPlugin'
import EmojisPlugin from '@/plugins/lexical/EmojisPlugin'
import EquationsPlugin from '@/plugins/lexical/EquationsPlugin'
import ExcalidrawPlugin from '@/plugins/lexical/ExcalidrawPlugin'
import FigmaPlugin from '@/plugins/lexical/FigmaPlugin'
import FloatingLinkEditorPlugin from '@/plugins/lexical/FloatingLinkEditorPlugin'
import FloatingTextFormatToolbarPlugin from '@/plugins/lexical/FloatingTextFormatToolbarPlugin'
import ImagesPlugin from '@/plugins/lexical/ImagesPlugin'
import InlineImagePlugin from '@/plugins/lexical/InlineImagePlugin'
import KeywordsPlugin from '@/plugins/lexical/KeywordsPlugin'
import { LayoutPlugin } from '@/plugins/lexical/LayoutPlugin/LayoutPlugin'
import LinkPlugin from '@/plugins/lexical/LinkPlugin'
import ListMaxIndentLevelPlugin from '@/plugins/lexical/ListMaxIndentLevelPlugin'
import MarkdownShortcutPlugin from '@/plugins/lexical/MarkdownShortcutPlugin'
import { MaxLengthPlugin } from '@/plugins/lexical/MaxLengthPlugin'
import MentionsPlugin from '@/plugins/lexical/MentionsPlugin'
import PageBreakPlugin from '@/plugins/lexical/PageBreakPlugin'
import PollPlugin from '@/plugins/lexical/PollPlugin'
import SpeechToTextPlugin from '@/plugins/lexical/SpeechToTextPlugin'
import TabFocusPlugin from '@/plugins/lexical/TabFocusPlugin'
import TableCellActionMenuPlugin from '@/plugins/lexical/TableActionMenuPlugin'
import TableCellResizer from '@/plugins/lexical/TableCellResizer'
import TableOfContentsPlugin from '@/plugins/lexical/TableOfContentsPlugin'
import ToolbarPlugin from '@/plugins/lexical/ToolbarPlugin'
import TreeViewPlugin from '@/plugins/lexical/TreeViewPlugin'
import TwitterPlugin from '@/plugins/lexical/TwitterPlugin'
import YouTubePlugin from '@/plugins/lexical/YouTubePlugin'
import ContentEditable from '@/ui/lexical/ContentEditable'
import Placeholder from '@/ui/lexical/Placeholder'
import { CAN_USE_DOM } from '@/lib/shared'

const skipCollaborationInit =
  // @ts-expect-error
  window.parent != null && window.parent.frames.right === window

export default function Editor(): JSX.Element {
  const { historyState } = useSharedHistoryContext()
  const {
    settings: {
      isCollab,
      isAutocomplete,
      isMaxLength,
      isCharLimit,
      isCharLimitUtf8,
      isRichText,
      showTreeView,
      showTableOfContents,
      shouldUseLexicalContextMenu,
      tableCellMerge,
      tableCellBackgroundColor,
    },
  } = useSettings()
  const isEditable = useLexicalEditable()
  const text = isCollab ? 'Enter some collaborative rich text...' : isRichText ? 'Enter some rich text...' : 'Enter some plain text...'
  const placeholder = <Placeholder>{text}</Placeholder>
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false)
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport = CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport)
      }
    }
    updateViewPortWidth()
    window.addEventListener('resize', updateViewPortWidth)

    return () => {
      window.removeEventListener('resize', updateViewPortWidth)
    }
  }, [isSmallWidthViewport])

  return (
    <>
      {isRichText && <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />}
      <div className={`editor-container ${showTreeView ? 'tree-view' : ''} ${!isRichText ? 'plain-text' : ''}`}>
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        <DragDropPaste />
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <EmojiPickerPlugin />
        <AutoEmbedPlugin />

        <MentionsPlugin />
        <EmojisPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <SpeechToTextPlugin />
        <AutoLinkPlugin />
        {isRichText ? (
          <>
            <HistoryPlugin externalHistoryState={historyState} />
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller">
                  <div className="editor" ref={onRef}>
                    <ContentEditable />
                  </div>
                </div>
              }
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <MarkdownShortcutPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <TablePlugin hasCellMerge={tableCellMerge} hasCellBackgroundColor={tableCellBackgroundColor} />
            <TableCellResizer />
            <ImagesPlugin />
            <InlineImagePlugin />
            <LinkPlugin />
            <PollPlugin />
            <TwitterPlugin />
            <YouTubePlugin />
            <FigmaPlugin />
            {!isEditable && <LexicalClickableLinkPlugin />}
            <HorizontalRulePlugin />
            <EquationsPlugin />
            <ExcalidrawPlugin />
            <TabFocusPlugin />
            <TabIndentationPlugin />
            <CollapsiblePlugin />
            <PageBreakPlugin />
            <LayoutPlugin />
            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                <FloatingLinkEditorPlugin
                  anchorElem={floatingAnchorElem}
                  isLinkEditMode={isLinkEditMode}
                  setIsLinkEditMode={setIsLinkEditMode}
                />
                <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
                <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
              </>
            )}
          </>
        ) : (
          <>
            <PlainTextPlugin contentEditable={<ContentEditable />} placeholder={placeholder} ErrorBoundary={LexicalErrorBoundary} />
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
        {(isCharLimit || isCharLimitUtf8) && <CharacterLimitPlugin charset={isCharLimit ? 'UTF-16' : 'UTF-8'} maxLength={5} />}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        <ActionsPlugin isRichText={isRichText} />
      </div>
      {showTreeView && <TreeViewPlugin />}
    </>
  )
}
