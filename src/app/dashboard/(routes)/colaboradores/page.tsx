import { fetchCollaborators, isManager } from '@/lib/utils'
import { CollaboratorCard } from '@/components/CollaboratorCard'
import { Edit2, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function ColaboradoresPage() {
  const collaborators = await fetchCollaborators()

  const manager = isManager()

  return (
    <main className="mx-auto max-w-7xl py-10 px-5">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-gray-950 font-semibold text-3xl">Colaboradores</h1>

        {manager && (
          <Link
            href={'/dashboard/colaboradores/criar'}
            className="flex items-center gap-2 bg-gray-800 text-gray-50 rounded-md px-4 py-2"
          >
            Adicionar
            <Plus width={24} height={24} className="stroke-slate-50" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {collaborators.map((collaborator) => (
          <CollaboratorCard.Root key={collaborator.id}>
            <div className="flex justify-between items-center">
              <CollaboratorCard.Profile
                src={collaborator.imgUrl}
                manager={collaborator.manager}
              >
                {collaborator.name}
              </CollaboratorCard.Profile>

              {manager && (
                <Link
                  href={`/dashboard/colaboradores/${collaborator.id}/editar`}
                >
                  <Edit2 width={24} height={24} className="stroke-slate-400" />
                </Link>
              )}
            </div>
            <CollaboratorCard.Contact
              phone={collaborator.phone}
              email={collaborator.email}
            />
            <CollaboratorCard.Tags tags={collaborator.fieldOfWork} />
            {manager && (
              <CollaboratorCard.Button
                href={`/dashboard/colaboradores/${collaborator.id}`}
              >
                Ver detalhes
              </CollaboratorCard.Button>
            )}
          </CollaboratorCard.Root>
        ))}
      </div>
    </main>
  )
}
