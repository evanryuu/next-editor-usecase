import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import './DraggableNode.css'
import { useState } from 'react'

const DraggableNode: React.FC = () => {
  const [show, setShow] = useState(false)
  const test = () => console.log('你有事？')
  return (
    <NodeViewWrapper class="draggable-item">
      <div className="drag-test-handle" contentEditable="false" draggable="true" data-drag-handle></div>
      <NodeViewContent className="content">
        <div onClick={test}></div>
      </NodeViewContent>
    </NodeViewWrapper>
  )
}

export default DraggableNode
