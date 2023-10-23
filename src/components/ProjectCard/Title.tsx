import { FolderGit2 } from 'lucide-react'
import { ComponentProps } from 'react'

type TitleProps = ComponentProps<'div'>

export function Title({ children }: TitleProps) {
  return (
    <div className="flex items-center gap-4">
      <FolderGit2 width={32} height={32} className="stroke-gray-800" />
      <p className="text-xl font-semibold text-gray-800">{children}</p>
    </div>
  )
}
