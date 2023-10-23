import { PrivateRoute } from '@/components/PrivateRoute'
import { fetchCollaborators, fetchProjectById } from '@/lib/utils'
import { UpdateProjectForm } from './components/UpdateProjectForm'

export default async function ProjectEditPage({
  params,
}: {
  params: { id: string }
}) {
  const actualProject = await fetchProjectById(+params.id)
  const allCollaborators = await fetchCollaborators(true)

  return (
    <main className="mx-auto max-w-2xl py-10 px-5">
      <PrivateRoute>
        <UpdateProjectForm
          actualProject={actualProject}
          allCollaborators={allCollaborators}
        />
      </PrivateRoute>
    </main>
  )
}
