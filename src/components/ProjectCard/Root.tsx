import { ComponentProps } from 'react'

type RootProps = ComponentProps<'div'>

export function Root({ children, className }: RootProps) {
  return (
    <div
      className={`space-y-7 px-8 py-10 rounded-lg border border-gray-500/10 shadow-lg min-w-max  ${className}`}
    >
      {children}
    </div>
  )
}
