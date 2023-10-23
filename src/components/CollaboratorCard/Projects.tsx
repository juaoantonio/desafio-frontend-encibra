import { Project } from '@prisma/client'
import { ChevronRight, FolderGit2 } from 'lucide-react'
import Link from 'next/link'

type ProjectsProps = {
  projects: Project[]
  title?: boolean
}

export function Projects({ projects, title = true }: ProjectsProps) {
  return (
    <div>
      {title && <p className="font-medium text-gray-900 mb-2">Projetos:</p>}

      <div className="space-y-2">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Link
              href={'/dashboard/projetos/' + project.id}
              key={project.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <FolderGit2
                  height={32}
                  width={32}
                  className="stroke-slate-400 inline-block mr-2"
                />
                <p className="max-w-[20ch] text-gray-500 font-medium">
                  {project.name}
                </p>
              </div>
              <ChevronRight
                height={28}
                width={28}
                className="stroke-gray-600"
              />
            </Link>
          ))
        ) : (
          <p className="text-xs max-w-[20ch] text-gray-500">
            Este colaborador não está em nenhum projeto
          </p>
        )}
      </div>
    </div>
  )
}
