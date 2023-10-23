import Image from 'next/image'
import { ComponentProps } from 'react'

type CollaboratorProps = ComponentProps<'div'> & {
  name: string
  imgUrl: string
  tags: string[]
}

export function Collaborator({
  name,
  imgUrl,
  tags,
  ...props
}: CollaboratorProps) {
  return (
    <div {...props}>
      <div className="flex items-center gap-4">
        <Image
          src={imgUrl}
          alt={name}
          className="rounded-full bg-gray-500/20 h-14 w-14"
          width={100}
          height={100}
        />
        <div>
          <p className="text-lg font-semibold text-gray-800">{name}</p>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-900 text-white text-xs font-medium py-1 px-2 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
