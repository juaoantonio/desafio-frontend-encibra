import { fetchProjects, isManager } from '@/lib/utils'
import { Edit2, Plus } from 'lucide-react'
import Link from 'next/link'
import { ProjectCard } from '@/components/ProjectCard'

export default async function ProjectsPage() {
  const projects = await fetchProjects()
  const manager = isManager()

  return (
    <main className="mx-auto max-w-7xl py-10 px-5">
      <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-gray-950 font-semibold text-3xl">Projetos</h1>

        {manager && (
          <Link
            href={'/dashboard/projetos/criar'}
            className="flex items-center gap-2 bg-gray-800 text-gray-50 rounded-md px-4 py-2"
          >
            Adicionar
            <Plus width={24} height={24} className="stroke-slate-50" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <ProjectCard.Root key={project.id}>
            <ProjectCard.Header>
              <div className="flex items-center gap-4">
                <ProjectCard.Title>{project.name}</ProjectCard.Title>

                {manager && (
                  <Link href={`/dashboard/projetos/${project.id}/editar`}>
                    <Edit2
                      width={24}
                      height={24}
                      className="stroke-slate-500 cursor-pointer"
                    />
                  </Link>
                )}
              </div>
              <p className="text-sm text-gray-500">Prazo: {project.deadline}</p>
            </ProjectCard.Header>
            <hr />
            <ProjectCard.Section title="Gestores">
              {project.collaborators
                .filter((collaborator) => collaborator.manager)
                .map((collaborator) => (
                  <ProjectCard.Collaborator
                    key={collaborator.id}
                    name={collaborator.name}
                    imgUrl={collaborator.imgUrl}
                    tags={collaborator.fieldOfWork}
                  />
                ))}
            </ProjectCard.Section>
            <hr />
            <ProjectCard.Section title="Colaboradores">
              {project.collaborators
                .filter((collaborator) => !collaborator.manager)
                .map((collaborator) => (
                  <ProjectCard.Collaborator
                    key={collaborator.id}
                    name={collaborator.name}
                    imgUrl={collaborator.imgUrl}
                    tags={collaborator.fieldOfWork}
                  />
                ))}
            </ProjectCard.Section>

            <ProjectCard.Section title="Tecnologias">
              <ProjectCard.Techs techs={project.technologies} />
            </ProjectCard.Section>

            {manager && <ProjectCard.Delete id={project.id} />}
          </ProjectCard.Root>
        ))}
      </div>
    </main>
  )
}
