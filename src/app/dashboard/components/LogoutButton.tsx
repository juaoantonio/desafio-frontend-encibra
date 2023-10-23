'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LogOutButton() {
  const router = useRouter()

  async function handleLogOut() {
    const response = await fetch('/api/logout')
    if (response.ok) {
      router.push(response.url)
    }
  }

  return (
    <button onClick={handleLogOut} className="p-3">
      <LogOut height={32} width={32} className="stroke-gray-50" />
    </button>
  )
}
