'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function ActiveLink({
  children,
  href,
  exact = false,
}: {
  children: React.ReactNode
  href: string
  exact?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()

  let activeStyle = pathname.startsWith(href) ? 'animate-activeLink' : ''

  if (exact) {
    activeStyle = pathname === href ? 'animate-activeLink' : ''
  }

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
