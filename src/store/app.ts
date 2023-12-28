import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// export type EditorType = 'react-quill' | 'slate' | 'tiptap'
export type EditorType = string

export interface AppState {
  editor: EditorType
  html: string
  setEditor: (editorType: AppState['editor']) => void
  setHTML: (str: string) => void
}

// export const useAppStore = createPersistedStore(
//     (set: any) => ({
//       editor: 'react-quill',
//       html: '',
//       setHTML: (html: string) => set(() => ({html})),
//       setEditor: (editorType: EditorType) => set(() => ({ editor: editorType })),
//     }),
//     {
//       name: 'app-store',
//     },
// )


export const useAppStore = create(
  persist<AppState>(
    (set) => ({
      editor: 'react-quill',
      html: '',
      setHTML: (html: string) => set(() => ({html})),
      setEditor: (editorType: EditorType) => set(() => ({ editor: editorType })),
    }),
    {
      name: 'app-store',
      skipHydration: true
    },
  ),
)
