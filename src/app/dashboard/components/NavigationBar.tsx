'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LogOutButton } from './LogoutButton'
import { Nav } from './Nav'
import useMedia from './hooks/useMedia'

export function NavigationBar() {
  const isMobile = useMedia('(max-width: 550px)')

  if (isMobile) {
    return (
      <aside className="bg-gray-900 p-2 flex justify-between items-center">
        <Nav />
        <LogOutButton />
      </aside>
    )
  }
  return (
    <aside className="bg-gray-900 w-max h-screen fixed px-2 py-5 flex flex-col justify-between items-center">
      <Link href="/dashboard">
        <Image src="/logo.svg" width={64} height={64} alt="Logo CoopDev" />
      </Link>
      <Nav />

      <LogOutButton />
    </aside>
  )
}
