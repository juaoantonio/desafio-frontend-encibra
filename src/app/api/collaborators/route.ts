import { getAllCollaboratorsParamsSchema } from '@/schemas'
import { CollaboratorService } from '@/services'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams.get('current')
  const result = getAllCollaboratorsParamsSchema.safeParse({
    current: searchParams,
  })
  const userId = req.cookies.get('id')?.value as string

  if (!result.success) {
    return NextResponse.json(
      {
        message: result.error.message,
      },
      { status: 400 },
    )
  }

  const { current } = result.data

  if (!current) {
    const collaborators = await CollaboratorService.getAllWithoutCurrent(
      +userId,
      true,
    )

    return NextResponse.json(
      {
        collaborators,
      },
      { status: 200 },
    )
  }

  const collaborators = await CollaboratorService.getAll()

  return NextResponse.json(
    {
      collaborators,
    },
    { status: 200 },
  )
}

export async function POST(req: NextRequest) {
  const collaborator = await req.json()
  const result = await CollaboratorService.createCollaborator(collaborator)

  if (result.error) {
    return NextResponse.json({ message: result.message }, { status: 400 })
  }

  if (!result.collaborator) {
    throw new Error('Collaborator not found')
  }

  return NextResponse.json(
    {
      email: result.collaborator.email,
      id: result.collaborator.id,
    },
    { status: 201 },
  )
}
