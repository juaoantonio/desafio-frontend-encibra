import Image from 'next/image'
import { ReactNode } from 'react'
import { Nav } from './components/Nav'
import Link from 'next/link'
import { LogOutButton } from './components/LogoutButton'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <aside className="bg-gray-900 w-max h-screen fixed px-2 py-5 flex flex-col justify-between items-center">
        <Link href="/dashboard">
          <Image src="/logo.svg" width={64} height={64} alt="Logo CoopDev" />
        </Link>
        <Nav />

        <LogOutButton />
      </aside>

      <div className="ml-20">{children}</div>
    </div>
  )
}
