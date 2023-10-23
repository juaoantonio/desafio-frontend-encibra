import { ReactNode } from 'react'
import { NavigationBar } from './components/NavigationBar'
import { Profile } from './components/Profile'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavigationBar />

      <div className="min-[550px]:ml-20">
        <Profile />
        {children}
      </div>
    </div>
  )
}
