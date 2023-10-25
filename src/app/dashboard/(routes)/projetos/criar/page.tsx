import { fetchCollaborators } from '@/lib/utils'
import { CreateProjectForm } from './components/CreateProjectForm'
import { PrivateRoute } from '@/components/PrivateRoute'

export default async function CreateProjectPage() {
  const collaborators = await fetchCollaborators(true)

  return (
    <PrivateRoute>
      <main className="mx-auto max-w-2xl py-10 px-5">
        <CreateProjectForm collaborators={collaborators} />
      </main>
    </PrivateRoute>
  )
}
