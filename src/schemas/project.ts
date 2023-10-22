import { z } from 'zod'
import { CollaboratorSchema } from './collaborator'

export const ProjectSchema = z.object({
  name: z.string(),
  deadline: z.string(),
  description: z.string(),
  technologies: z.array(z.string()).min(1),
  projectManager: z.number().int().positive(),
  backendCollaborator: z.number().int().positive(),
  frontendCollaborator: z.number().int().positive(),
  collaborators: z.array(z.unknown()).min(1),
})
