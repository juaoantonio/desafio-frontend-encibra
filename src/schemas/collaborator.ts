import { z } from 'zod'

export const CollaboratorSchema = z.object({
  name: z.string(),
  age: z.coerce.number().int().positive(),
  gender: z.string(),
  email: z.string().email(),
  phone: z.string(),
  fieldOfWork: z.enum([
    'BACKEND',
    'FRONTEND',
    'DEVOPS',
    'DESIGN',
    'MANAGEMENT',
    'REQUIREMENTS',
  ]),
  employmentType: z.enum(['CLT', 'PJ']),
  manager: z.boolean().default(false),
  salary: z.coerce.number().min(0),
  password: z.string().min(8),
  address: z.string(),
  imgUrl: z.string(),
})

export const updateCollaboratorSchema = z.object({
  name: z.string().optional(),
  age: z.coerce.number().int().positive().optional(),
  gender: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  fieldOfWork: z
    .enum([
      'BACKEND',
      'FRONTEND',
      'DEVOPS',
      'DESIGN',
      'MANAGEMENT',
      'REQUIREMENTS',
    ])
    .optional(),
  employmentType: z.enum(['CLT', 'PJ']).optional(),
  manager: z.boolean().default(false).optional(),
  salary: z.coerce.number().min(0).optional(),
  password: z.string().min(8).optional(),
  address: z.string().optional(),
  imgUrl: z.string().optional(),
})
