import { ReactNode } from 'react'
import { NavigationBar } from './components/NavigationBar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavigationBar />

      <div className="min-[550px]:ml-20">{children}</div>
    </div>
  )
}
