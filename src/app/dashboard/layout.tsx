import Image from 'next/image'
import { ReactNode } from 'react'
import { Nav } from './components/Nav'
import Link from 'next/link'
import { LogOutButton } from './components/LogoutButton'
import { NavigationBar } from './components/NavigationBar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavigationBar />

      <div className="min-[550px]:ml-20">{children}</div>
    </div>
  )
}
