import Link from 'next/link'
import { ComponentProps } from 'react'

type ButtonProps = {
  children: React.ReactNode
  href: string
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <Link
      className="bg-gray-900 text-white font-medium py-2 px-8 rounded-lg text-xl mt-6 inline-block "
      {...props}
    >
      {children}
    </Link>
  )
}
