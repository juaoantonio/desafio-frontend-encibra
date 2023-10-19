import Image from 'next/image'
import { ReactNode } from 'react'
import { Nav } from './components/Nav'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <aside className="bg-gray-900 w-max h-screen fixed px-2 pt-5 space-y-24">
        <Link href="/dashboard">
          <Image src="/logo.svg" width={64} height={64} alt="Logo CoopDev" />
        </Link>
        <Nav />
      </aside>

      <main className="ml-20">{children}</main>
    </div>
  )
}
