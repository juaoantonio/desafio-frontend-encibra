import { Prisma, Collaborator, Project } from '@prisma/client'
import { cookies } from 'next/headers'

type ColllaboratorWithProjects = Collaborator & {
  projects: Project[]
}

type ProjectWithCollaborators = Project & {
  collaborators: Collaborator[]
}

export async function fetchCollaborators(
  current: boolean = false,
): Promise<ColllaboratorWithProjects[]> {
  const Cookies = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)

  const currentParam = current ? 1 : 0

  const response = await fetch(
    process.env.URL + `/api/collaborators?current=${currentParam}`,
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

export async function fetchProjectById(
  id: number,
): Promise<ProjectWithCollaborators> {
  const Cookies = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)

  const response = await fetch(process.env.URL + `/api/projects/${id}/`, {
    cache: 'no-cache',
    headers: {
      Cookie: Cookies.join(';'),
    },
  })

  const project = await response.json().then((data) => data.project)
  return project
}

export async function fetchCollaboratorById(
  id: number,
): Promise<ColllaboratorWithProjects> {
  const Cookies = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)

  const response = await fetch(process.env.URL + `/api/collaborators/${id}/`, {
    cache: 'no-cache',
    headers: {
      Cookie: Cookies.join(';'),
    },
  })

  const collaborator = await response.json().then((data) => data.collaborator)
  return collaborator
}

export function isManager() {
  const cookieStore = cookies()
  const isManager = !!Number(cookieStore.get('manager')?.value)

  return isManager
}
