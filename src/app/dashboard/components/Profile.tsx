import { fetchCollaboratorById } from '@/lib/utils'
import { Edit2 } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

export async function Profile() {
  const collaboratorId = cookies().get('id')!.value
  const currentCollaborator = await fetchCollaboratorById(+collaboratorId)

  return (
    <div className="mx-auto max-w-7xl pt-10 px-5 flex justify-between items-center">
      <div className="flex gap-4">
        <Image
          src={currentCollaborator.imgUrl}
          alt="Avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="flex flex-col">
          Bem-vindo:{' '}
          <span className="text-lg font-bold">{currentCollaborator.name}</span>
        </p>
      </div>

      <Link
        href={`/dashboard/colaboradores/${currentCollaborator.id}/editar`}
        className="flex items-center gap-2 bg-gray-800 text-gray-50 rounded-md px-4 py-2 text-xs h-max"
      >
        Editar perfil
        <Edit2 width={16} height={16} className="stroke-slate-50" />
      </Link>
    </div>
  )
}
