import { ProjectCard } from '@/components/ProjectCard'
import { fetchProjects } from '@/lib/utils'

export async function ProjectsSlide() {
  const projects = await fetchProjects()

  return (
    <div className="relative after:absolute after:h-full after:w-10 after:top-0 after:left-[calc(100%-40px)] after:bg-gradient-to-l after:from-black/10">
      <div className="grid grid-flow-col gap-5 overflow-x-scroll">
        {projects.map((project) => (
          <ProjectCard.Root key={project.id}>
            <ProjectCard.Header>
              <ProjectCard.Title>{project.name}</ProjectCard.Title>
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
            <hr />
            <ProjectCard.Button href={`/dashboard/projetos/${project.id}`}>
              Ver detalhes
            </ProjectCard.Button>
          </ProjectCard.Root>
        ))}
      </div>
    </div>
  )
}
