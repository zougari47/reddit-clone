import dynamic from 'next/dynamic'
import { FC } from 'react'
import Image from 'next/image'

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  {
    ssr: false,
  }
)

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
}

const CustomImageRenderer = ({ data }: any) => {
  const src = data.file.url

  return (
    <div className="relative w-full min-h-[15rem]">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  )
}

const renderers = {
  image: CustomImageRenderer,
  //   code: CustomCodeRenderer,
}

interface IEditorOutputProps {
  content: any
}

const EditorOutput: FC<IEditorOutputProps> = ({ content }) => {
  return (
    <Output
      data={content}
      style={style}
      className="text-sm"
      renderers={renderers}
    />
  )
}

export default EditorOutput
