import { fetchCollaboratorById } from '@/lib/utils'
import { cookies } from 'next/headers'
import Image from 'next/image'

export async function Profile() {
  const collaboratorId = cookies().get('id')!.value
  const currentCollaborator = await fetchCollaboratorById(+collaboratorId)

  return (
    <div className="mx-auto max-w-7xl pt-10 px-5 flex items-center gap-4">
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
  )
}
