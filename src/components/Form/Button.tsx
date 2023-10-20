import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'>

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type="submit"
      className="bg-gray-900 text-white font-medium py-2 px-8 rounded-lg text-xl mt-6 w-full"
      {...props}
    >
      {children}
    </button>
  )
}
