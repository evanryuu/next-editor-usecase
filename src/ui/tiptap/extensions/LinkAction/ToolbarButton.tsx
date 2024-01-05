import * as React from 'react'

export const ToolbarButton = ({ onClick, children }: { onClick: any; children: React.ReactNode }) => {
  return <button onClick={onClick}>{children}</button>
}
