import { PrivateRoute } from '@/components/PrivateRoute'
import { UpdateCollaboratorForm } from './components/UpdateCollaboratorForm'
import { fetchCollaboratorById } from '@/lib/utils'

export default async function CollaboratorEditPage({
  params,
}: {
  params: { id: string }
}) {
  const actualCollaborator = await fetchCollaboratorById(+params.id)

  return (
    <main className="mx-auto max-w-2xl py-10 px-5">
      <PrivateRoute>
        <UpdateCollaboratorForm actualCollaborator={actualCollaborator} />
      </PrivateRoute>
    </main>
  )
}
