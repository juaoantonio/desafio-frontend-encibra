import { Prisma, Collaborator, Project } from '@prisma/client'
import { cookies } from 'next/headers'

type ColllaboratorWithProjects = Collaborator & {
  projects: Project[]
}

type ProjectWithCollaborators = Project & {
  collaborators: Collaborator[]
}

export async function fetchCollaborators(): Promise<
  ColllaboratorWithProjects[]
> {
  const Cookies = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)

  const response = await fetch(
    process.env.URL + '/api/collaborators?current=0',
    {
      cache: 'no-cache',
      headers: {
        Cookie: Cookies.join(';'),
      },
    },
  )

  const collaborators = await response.json().then((data) => data.collaborators)
  return collaborators
}

export async function fetchProjects(): Promise<ProjectWithCollaborators[]> {
  const Cookies = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)

  const response = await fetch(process.env.URL + '/api/projects', {
    cache: 'no-cache',
    headers: {
      Cookie: Cookies.join(';'),
    },
  })

  const projects = await response.json().then((data) => data.projects)
  return projects
}

export function isManager() {
  const cookieStore = cookies()
  const isManager = !!Number(cookieStore.get('manager')?.value)

  return isManager
}
