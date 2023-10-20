import { ComponentProps } from 'react'

type RootProps = ComponentProps<'form'>

export function Root({ children, ...props }: RootProps) {
  return (
    <form className="space-y-5" {...props}>
      {children}
    </form>
  )
}
