import { CollaboratorCard } from '@/components/CollaboratorCard'
import { fetchCollaborators, isManager } from '@/lib/utils'
import { Edit2 } from 'lucide-react'
import Link from 'next/link'

export async function CollaboratorsSlide() {
  const collaborators = await fetchCollaborators()
  const manager = isManager()

  return (
    <div className="relative after:absolute after:h-full after:w-10 after:top-0 after:left-[calc(100%-40px)] after:bg-gradient-to-l after:from-black/10">
      <div className="grid grid-flow-col gap-5 overflow-x-scroll">
        {collaborators.map((collaborator) => (
          <CollaboratorCard.Root key={collaborator.id} className="w-96">
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
            <CollaboratorCard.Projects projects={collaborator.projects} />
            <CollaboratorCard.Tags tags={collaborator.fieldOfWork} />
          </CollaboratorCard.Root>
        ))}
      </div>
    </div>
  )
}
