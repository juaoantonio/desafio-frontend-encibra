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

    const resultData = result.data

    const updatedCollaborator = await prisma.collaborator.update({
      where: { id },
      data: {
        name: resultData.name,
        email: resultData.email,
        password: resultData.password,
        manager: resultData.manager,
        address: resultData.address,
        phone: resultData.phone,
        salary: resultData.salary,
        gender: resultData.gender,
        imgUrl: resultData.imgUrl,
        age: resultData.age,
        employmentType: resultData.employmentType,
        fieldOfWork: resultData.fieldOfWork,
      },
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

    if (result.success) {
      const resultData = result.data
      const {
        collaborators,
        backendCollaborators,
        frontendCollaborators,
        managerCollaborators,
      } = resultData
      const allCollaborators = [
        ...collaborators,
        ...backendCollaborators,
        ...frontendCollaborators,
        ...managerCollaborators,
      ]

      return {
        error: false,
        project: await prisma.project.create({
          data: {
            name: resultData.name,
            deadline: resultData.deadline.toDateString(),
            description: resultData.description,
            technologies: resultData.technologies,
            collaborators: {
              connect: allCollaborators.map((email) => ({
                email,
              })),
            },
          },
        }),
      }
    }

    return {
      error: true,
      message: result.error.message,
    }
  }

  async getAll() {
    return await prisma.project.findMany({
      include: {
        collaborators: true,
      },
    })
  }

  async getById(id: number) {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        collaborators: true,
      },
    })
  }

  async update(id: number, data: Prisma.ProjectUpdateInput) {
    const result = ProjectSchema.safeParse(data)

    if (result.success) {
      const resultData = result.data
      const {
        collaborators,
        backendCollaborators,
        frontendCollaborators,
        managerCollaborators,
      } = resultData
      const allCollaborators = [
        ...collaborators,
        ...backendCollaborators,
        ...frontendCollaborators,
        ...managerCollaborators,
      ]

      return {
        error: false,
        project: await prisma.project.update({
          where: { id },
          data: {
            name: resultData.name,
            deadline: resultData.deadline.toDateString(),
            description: resultData.description,
            technologies: resultData.technologies,
            collaborators: {
              connect: allCollaborators.map((email) => ({
                email,
              })),
            },
          },
        }),
      }
    }

    return {
      error: true,
      message: result.error.message,
    }
  }

  async delete(id: number) {
    return await prisma.project.delete({
      where: { id },
    })
  }
}

export const CollaboratorService = new collaboratorService()
export const ProjectService = new projectService()
