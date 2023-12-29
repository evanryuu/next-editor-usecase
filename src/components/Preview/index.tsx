interface PreviewProps {
  html: string
  className?: string
}

const Preview: React.FC<PreviewProps> = ({ html, className }) => {
  return (
    <div
      className={`${className} bg-white border-l tiptap`}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    ></div>
  )
}

export default Preview
