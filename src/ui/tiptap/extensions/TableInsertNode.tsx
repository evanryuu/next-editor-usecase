import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import './DraggableNode.css'
import { useState } from 'react'

const TableInsertNode: React.FC = () => {
  const [show, setShow] = useState(false)
  const [count, setCount] = useState(0)
  const test = () => console.log('你有事？')
  return (
    <NodeViewWrapper className="group relative" as="table">
      <div className="drag-test-handle transition-opacity group-hover:opacity-100" contentEditable="false" draggable="true" data-drag-handle />
      <NodeViewContent className="" as="tbody"></NodeViewContent>
    </NodeViewWrapper>
  )
}

export default TableInsertNode
