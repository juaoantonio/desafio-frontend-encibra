import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'a'>

export function Button({ children, ...props }: ButtonProps) {
  return (
    <a
      className="bg-gray-900 text-white font-medium py-2 px-8 rounded-lg text-xl mt-6 inline-block "
      {...props}
    >
      {children}
    </a>
  )
}
