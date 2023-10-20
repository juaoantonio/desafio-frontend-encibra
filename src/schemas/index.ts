import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Por favor, insira um email válido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})
