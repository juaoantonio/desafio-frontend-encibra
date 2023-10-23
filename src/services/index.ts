import { prisma } from '@/lib/prisma'
import {
  CollaboratorSchema,
  updateCollaboratorSchema,
} from '@/schemas/collaborator'
import { ProjectSchema } from '@/schemas/project'
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

  async getAll() {
    return await prisma.collaborator.findMany()
  }

  async getById(id: number) {
    return await prisma.collaborator.findUnique({
      where: { id },
    })
  }

  async getByEmail(email: string) {
    return await prisma.collaborator.findUnique({
      where: { email },
    })
  }

  async update(id: number, data: Prisma.CollaboratorUpdateInput) {
    const result = updateCollaboratorSchema.safeParse(data)

    if (!result.success) {
      return {
        error: true,
        message: result.error.message,
      }
    }

    const updatedCollaborator = await prisma.collaborator.update({
      where: { id },
      data,
    })

    return {
      error: false,
      updatedCollaborator,
    }
  }

  async delete(id: number) {
    return await prisma.collaborator.delete({
      where: { id },
    })
  }

  async getAllWithoutCurrent(id: number, projects = false) {
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
  async create(data: Prisma.ProjectCreateInput) {
    const result = ProjectSchema.safeParse(data)

    if (!result.success) {
      return {
        error: true,
        message: result.error.message,
      }
    }

    return {
      error: false,
      project: await prisma.project.create({ data }),
    }
  }

  async getAll() {
    return await prisma.project.findMany()
  }

  async getById(id: number) {
    return await prisma.project.findUnique({
      where: { id },
    })
  }

  async update(id: number, data: Prisma.ProjectUpdateInput) {
    return await prisma.project.update({
      where: { id },
      data,
    })
  }

  async delete(id: number) {
    return await prisma.project.delete({
      where: { id },
    })
  }
}

export const CollaboratorService = new collaboratorService()
export const ProjectService = new projectService()
