import { CollaboratorCard } from '@/components/CollaboratorCard'
import { PrivateRoute } from '@/components/PrivateRoute'
import { fetchCollaboratorById } from '@/lib/utils'
import { Edit2 } from 'lucide-react'
import Link from 'next/link'

export default async function CollaboratorDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const currentCollaborator = await fetchCollaboratorById(+params.id)
  const otherInfo = [
    { name: 'Endereço', value: currentCollaborator.address },
    { name: 'Idade', value: currentCollaborator.age },
    { name: 'Gênero', value: currentCollaborator.gender },
    { name: 'Salário', value: currentCollaborator.salary },
    { name: 'Tipo de Contratação', value: currentCollaborator.employmentType },
  ]

  return (
    <PrivateRoute>
      <main className="mx-auto max-w-xl py-10 px-5">
        <CollaboratorCard.Root>
          <div className="flex justify-between items-center">
            <CollaboratorCard.Profile
              src={currentCollaborator.imgUrl}
              manager={currentCollaborator.manager}
            >
              {currentCollaborator.name}
            </CollaboratorCard.Profile>

            <div className="flex gap-4 items-center">
              <Link
                href={`/dashboard/colaboradores/${currentCollaborator.id}/editar`}
              >
                <Edit2 width={24} height={24} className="stroke-slate-400" />
              </Link>
              <CollaboratorCard.Delete id={currentCollaborator.id} />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-gray-600 text-lg">
              Áreas de Atuação
            </p>
            <CollaboratorCard.Tags
              tags={currentCollaborator.fieldOfWork}
              title={false}
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-gray-600 text-lg">Contato:</p>
            <CollaboratorCard.Contact
              phone={currentCollaborator.phone}
              email={currentCollaborator.email}
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-gray-600 text-lg">Projetos:</p>
            <CollaboratorCard.Projects
              projects={currentCollaborator.projects}
              title={false}
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-gray-600 text-lg">
              Outras informações:
            </p>
            {otherInfo.map((info) => (
              <p className="text-gray-500 text-sm" key={info.name}>
                <strong className="text-gray-600 text-base font-medium">
                  {info.name}:
                </strong>{' '}
                {info.value}
              </p>
            ))}
          </div>
        </CollaboratorCard.Root>
      </main>
    </PrivateRoute>
  )
}
