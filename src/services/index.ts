import { prisma } from '@/lib/prisma'
import { CollaboratorSchema } from '@/schemas/collaborator'
import { Prisma } from '@prisma/client'

class collaboratorService {
  async createCollaborator(data: Prisma.CollaboratorCreateInput) {
    const result = CollaboratorSchema.safeParse(data)

    if (result.success) {
      const collaboratorExists = await prisma.collaborator.findUnique({
        where: { email: data.email },
      })

      if (collaboratorExists) {
        return {
          error: true,
          message: 'Já existe um colaborador com esse email',
        }
      }

      const collaborator = await prisma.collaborator.create({ data })

      return {
        error: false,
        collaborator,
      }
    }

    throw new Error(result.error.message)
  }

  async getCollaborators() {
    return await prisma.collaborator.findMany()
  }

  async getCollaboratorById(id: number) {
    return await prisma.collaborator.findUnique({
      where: { id },
    })
  }

  async getCollaboratorByEmail(email: string) {
    return await prisma.collaborator.findUnique({
      where: { email },
    })
  }

  async updateCollaborator(id: number, data: Prisma.CollaboratorUpdateInput) {
    return await prisma.collaborator.update({
      where: { id },
      data,
    })
  }

  async deleteCollaborator(id: number) {
    return await prisma.collaborator.delete({
      where: { id },
    })
  }

  async getCollaboratorWithoutCurrent(id: number, projects = false) {
    return await prisma.collaborator.findMany({
      where: {
        id: {
          not: id,
        },
      },
      orderBy: {
        manager: 'desc',
      },
      include: {
        projects,
      },
    })
  }
}

class projectService {
  async createProject(data: Prisma.ProjectCreateInput) {
    return await prisma.project.create({ data })
  }

  async getProjects() {
    return await prisma.project.findMany()
  }

  async getProjectById(id: number) {
    return await prisma.project.findUnique({
      where: { id },
    })
  }

  async updateProject(id: number, data: Prisma.ProjectUpdateInput) {
    return await prisma.project.update({
      where: { id },
      data,
    })
  }

  async deleteProject(id: number) {
    return await prisma.project.delete({
      where: { id },
    })
  }
}

export const CollaboratorService = new collaboratorService()
export const ProjectService = new projectService()
