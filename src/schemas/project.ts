import { z } from 'zod'

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

export const updateProjectSchema = z.object({
  name: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).min(1).optional(),
  projectManager: z.number().int().positive().optional(),
  backendCollaborator: z.number().int().positive().optional(),
  frontendCollaborator: z.number().int().positive().optional(),
  collaborators: z.array(z.unknown()).min(1).optional(),
})
