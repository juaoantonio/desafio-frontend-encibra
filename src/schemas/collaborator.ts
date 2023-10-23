import { employmentType } from '@prisma/client'
import { z } from 'zod'

export const CollaboratorSchema = z
  .object({
    name: z.string(),
    age: z.coerce.number().int().positive(),
    gender: z.string(),
    email: z.string().email(),
    phone: z.string(),
    fieldOfWork: z
      .array(
        z.enum([
          'BACKEND',
          'FRONTEND',
          'DEVOPS',
          'DESIGN',
          'MANAGEMENT',
          'REQUIREMENTS',
        ]),
      )
      .refine(
        (items) => new Set(items).size === items.length,
        'Não devem haver itens repetidos',
      ),
    employmentType: z.enum(['CLT', 'PJ']),
    manager: z.boolean().default(false),
    salary: z.coerce.number().min(0),
    password: z.string().min(8),
    address: z.string(),
    imgUrl: z.string(),
  })
  .refine(
    (schema) => {
      if (schema.manager) {
        return schema.fieldOfWork.includes('MANAGEMENT')
      }
    },
    {
      path: ['manager'],
      message:
        'Gerentes devem ter a área de atuação configuradas como MANAGEMENT',
    },
  )

export const updateCollaboratorSchema = z.object({
  name: z.string().optional(),
  age: z.coerce.number().int().positive().optional(),
  gender: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  fieldOfWork: z
    .array(
      z.enum([
        'BACKEND',
        'FRONTEND',
        'DEVOPS',
        'DESIGN',
        'MANAGEMENT',
        'REQUIREMENTS',
      ]),
    )
    .refine(
      (items) => new Set(items).size === items.length,
      'Não devem haver itens repetidos',
    )
    .optional(),
  employmentType: z.enum(['CLT', 'PJ']).optional(),
  manager: z.boolean().default(false).optional(),
  salary: z.coerce.number().min(0).optional(),
  password: z.string().min(8).optional(),
  address: z.string().optional(),
  imgUrl: z.string().optional(),
})
