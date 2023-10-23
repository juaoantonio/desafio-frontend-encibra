'use client'

import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Delete({ id }: { id: number }) {
  const router = useRouter()

  async function handleDelete(id: number) {
    const response = await fetch(`/api/projects/${id}/`, {
      method: 'DELETE',
    })

    if (response.status === 200) {
      router.push('/dashboard/projetos')
      router.refresh()
      return
    }

    alert('Erro ao deletar colaborador')
  }

  return (
    <button
      type="button"
      className="bg-red-500 text-white rounded-md px-4 py-2"
      onClick={() => handleDelete(id)}
    >
      <Trash width={24} height={24} className="stroke-white" />
    </button>
  )
}
