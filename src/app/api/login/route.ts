import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/schemas'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const requestBody = await req.json()
  console.log(requestBody)

  const url = req.nextUrl.clone()
  url.pathname = '/dashboard'

  const result = loginSchema.safeParse(requestBody)

  console.log(result)

  if (result.success) {
    const { email, password } = result.data
    const collaborator = await prisma.collaborator.findUnique({
      where: { email },
    })

    if (collaborator?.senha === password) {
      return NextResponse.redirect(url, {
        status: 301,
        headers: {
          'Set-Cookie': `id=${collaborator.id}; Path=/; HttpOnly`,
        },
      })
    }

    return NextResponse.json(
      { message: 'Credenciais inválidas' },
      { status: 401 },
    )
  }

  return NextResponse.json({ message: result.error.message }, { status: 400 })
}
