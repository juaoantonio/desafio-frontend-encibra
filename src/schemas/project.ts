import { z } from 'zod'
import { CollaboratorSchema } from './collaborator'

export const ProjectSchema = z.object({
  name: z.string(),
  deadline: z.coerce.date().min(new Date()),
  description: z.string(),
  technologies: z.array(z.string()).min(1),
  managerCollaborators: z.array(z.string().email()).min(1),
  backendCollaborators: z.array(z.string().email()).min(1),
  frontendCollaborators: z.array(z.string().email()).min(1),
  collaborators: z.array(z.string().email()),
})

export const updateProjectSchema = z.object({
  name: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).min(1).optional(),
  managerCollaborators: z.array(z.string().email()).min(1).optional(),
  backendCollaborators: z.array(z.string().email()).min(1).optional(),
  frontendCollaborators: z.array(z.string().email()).min(1).optional(),
  collaborators: z.array(z.string().email()).min(1).optional(),
})
