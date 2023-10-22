import { ComponentProps } from 'react'

type WrapperProps = ComponentProps<'div'>

export function Wrapper({ children, className }: WrapperProps) {
  return (
    <div
      className={`mx-auto space-y-8 w-full rounded-lg shadow-xl px-10 py-8 border border-gray-950/10 ${className}`}
    >
      {children}
    </div>
  )
}
