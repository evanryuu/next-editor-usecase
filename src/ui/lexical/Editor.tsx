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
import { CAN_USE_DOM } from '@/shared/canUseDOM'

import AutoEmbedPlugin from './plugins/AutoEmbedPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import ImagesPlugin from './plugins/ImagesPlugin'
import LinkPlugin from './plugins/LinkPlugin'
import TableOfContentsPlugin from './plugins/TableOfContentsPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import TwitterPlugin from './plugins/TwitterPlugin'
import { useSharedHistoryContext } from './context/SharedHistoryContext'
import Placeholder from './components/Placeholder'
import { useSettings } from './context/SettingsContext'
import YouTubePlugin from './plugins/YoutubePlugin'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin'

const skipCollaborationInit =
  // @ts-expect-error
  window.parent != null && window.parent.frames.right === window

export default function Editor(): JSX.Element {
  const { historyState } = useSharedHistoryContext()
  const {
    settings: {
      isCollab,
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
        <AutoFocusPlugin />
        <HashtagPlugin />
        <AutoLinkPlugin />
        {isRichText ? (
          <>
            <HistoryPlugin externalHistoryState={historyState} />

            <ListPlugin />
            <CheckListPlugin />
            <TablePlugin hasCellMerge={tableCellMerge} hasCellBackgroundColor={tableCellBackgroundColor} />
            {/* <TableCellResizer /> */}
            <ImagesPlugin />
            <LinkPlugin />
            <TwitterPlugin />
            <YouTubePlugin />
            {!isEditable && <LexicalClickableLinkPlugin />}
            <HorizontalRulePlugin />
            <TabIndentationPlugin />
            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                <FloatingLinkEditorPlugin
                  anchorElem={floatingAnchorElem}
                  isLinkEditMode={isLinkEditMode}
                  setIsLinkEditMode={setIsLinkEditMode}
                />
                {/* <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} /> */}
                {/* <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} /> */}
              </>
            )}
          </>
        ) : (
          <>
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
      </div>
    </>
  )
}
