import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// export type EditorType = 'react-quill' | 'slate' | 'tiptap'
export type EditorType = string

export interface AppState {
  editor: EditorType
  setEditor: (editorType: AppState['editor']) => void
}

export const useAppStore = create(
  persist<AppState>(
    (set) => ({
      editor: 'react-quill',
      setEditor: (editorType: EditorType) => set(() => ({ editor: editorType })),
    }),
    {
      name: 'app-store',
    },
  ),
)
