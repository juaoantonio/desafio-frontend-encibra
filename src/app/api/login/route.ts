import { loginSchema } from '@/schemas'
import { CollaboratorService } from '@/services'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const headers = new Headers()
  const requestBody = await req.json()

  const url = req.nextUrl.clone()
  url.pathname = '/dashboard'

  const result = loginSchema.safeParse(requestBody)

  if (result.success) {
    const { email, password } = result.data
    const collaborator = await CollaboratorService.getByEmail(email)

    if (collaborator?.password === password) {
      headers.append('Set-Cookie', `id=${collaborator.id}; Path=/; HttpOnly`)
      headers.append(
        'Set-Cookie',
        `manager=${+collaborator.manager}; Path=/; HttpOnly`,
      )

      return NextResponse.redirect(url, {
        status: 301,
        headers,
      })
    }

    return NextResponse.json(
      { message: 'Credenciais inválidas' },
      { status: 401 },
    )
  }

  return NextResponse.json({ message: result.error.message }, { status: 400 })
}
