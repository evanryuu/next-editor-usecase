import { toast } from 'sonner'
import { EditorState, Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet, EditorView } from '@tiptap/pm/view'
import axios from 'axios'
import { getCookie } from '@/utils/utils'

const uploadKey = new PluginKey('upload-image')

const UploadImagesPlugin = () =>
  new Plugin({
    key: uploadKey,
    state: {
      init() {
        return DecorationSet.empty
      },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc)
        // See if the transaction adds or removes any placeholders
        const action = tr.getMeta(this)
        if (action && action.add) {
          const { id, pos, src } = action.add

          const placeholder = document.createElement('div')
          placeholder.setAttribute('class', 'img-placeholder')
          const image = document.createElement('img')
          image.setAttribute('class', 'opacity-20 rounded-lg border border-stone-200')
          image.src = src
          placeholder.appendChild(image)
          const deco = Decoration.widget(pos + 1, placeholder, {
            id,
          })
          set = set.add(tr.doc, [deco])
        } else if (action && action.remove) {
          set = set.remove(set.find(null, null, (spec) => spec.id == action.remove.id))
        }
        return set
      },
    },
    props: {
      decorations(state) {
        return this.getState(state)
      },
    },
  })

export default UploadImagesPlugin

function findPlaceholder(state: EditorState, id: {}) {
  const decos = uploadKey.getState(state)
  const found = decos.find(null, null, (spec) => spec.id == id)
  return found.length ? found[0].from : null
}

export function startImageUpload(file: File, view: EditorView, pos: number) {
  // check if the file is an image
  if (!file.type.includes('image/')) {
    toast.error('File type not supported.')
    return

    // check if the file size is less than 4MB
  } else if (file.size / 1024 / 1024 > 4) {
    toast.error('File size too big (max 4MB).')
    return
  }
  console.log(file)

  // A fresh object to act as the ID for this upload
  const id = {}

  // Replace the selection with a placeholder
  const tr = view.state.tr
  if (!tr.selection.empty) tr.deleteSelection()

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    tr.setMeta(uploadKey, {
      add: {
        id,
        pos,
        src: reader.result,
      },
    })
    view.dispatch(tr)

    handleImageUpload(reader.result as string).then((src) => {
      const { schema } = view.state

      let pos = findPlaceholder(view.state, id)
      // If the content around the placeholder has been deleted, drop
      // the image
      if (pos == null) return

      // Otherwise, insert it at the placeholder's position, and remove
      // the placeholder

      // When BLOB_READ_WRITE_TOKEN is not valid or unavailable, read
      // the image locally
      const imageSrc = typeof src === 'object' ? reader.result : src

      const node = schema.nodes.image.create({ src: imageSrc })
      const transaction = view.state.tr.replaceWith(pos, pos, node).setMeta(uploadKey, { remove: { id } })
      view.dispatch(transaction)
    })
  }
}

export const handleImageUpload = (base64: string) => {
  // upload to Vercel Blob
  return new Promise((resolve) => {
    toast.promise(
      axios
        .post(
          '/legacy/api/personal/article/upload',
          { picture: base64.substring(base64.indexOf(',') + 1), folder: 'article' },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Xsrf-Token': getCookie('XSRF-TOKEN'),
            },
          }
        )
        .then(async ({ data: res }) => {
          // Successfully uploaded image
          if (res.success) {
            const url = res.data.path
            // preload the image
            let image = new Image()
            image.src = url
            image.onload = () => {
              resolve(url)
            }
          } else {
            toast(res.error)
          }
        }),
      {
        loading: 'Uploading image...',
        success: 'Image uploaded successfully.',
        error: (e) => e.message,
      }
    )
  })
}
