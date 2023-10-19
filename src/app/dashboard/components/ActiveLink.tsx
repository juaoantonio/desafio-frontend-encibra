'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function ActiveLink({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const activeStyle = pathname === href ? 'animate-activeLink' : ''

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href') as string
    router.push(href)
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`p-3 rounded-full ${activeStyle}`}
    >
      {children}
    </Link>
  )
}
