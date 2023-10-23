import { idParamSchema } from '@/schemas'
import { CollaboratorService } from '@/services'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const result = idParamSchema.safeParse(params)

  if (!result.success) {
    return NextResponse.json(
      {
        message: result.error.message,
      },
      { status: 400 },
    )
  }

  const { id } = result.data

  const collaborator = await CollaboratorService.getById(+id)

  if (!collaborator) {
    return NextResponse.json(
      {
        message: 'Colaborador não encontrado',
      },
      { status: 404 },
    )
  }

  return NextResponse.json(
    {
      collaborator,
    },
    { status: 200 },
  )
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const result = idParamSchema.safeParse(params)

  if (!result.success) {
    return NextResponse.json(
      {
        message: result.error.message,
      },
      { status: 400 },
    )
  }

  const { id } = result.data
  const collaborator = await req.json()

  const resultUpdate = await CollaboratorService.update(+id, collaborator)

  if (resultUpdate.error) {
    return NextResponse.json(
      {
        message: resultUpdate.message,
      },
      { status: 400 },
    )
  }

  return NextResponse.json(
    {
      message: 'Colaborador atualizado com sucesso',
    },
    { status: 200 },
  )
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const result = idParamSchema.safeParse(params)

  if (!result.success) {
    return NextResponse.json(
      {
        message: result.error.message,
      },
      { status: 400 },
    )
  }

  const { id } = result.data

  const collaborator = await CollaboratorService.getById(+id)

  if (!collaborator) {
    return NextResponse.json(
      {
        message: 'Colaborador não encontrado',
      },
      { status: 404 },
    )
  }

  await CollaboratorService.delete(+id)

  return NextResponse.json(
    {
      message: 'Colaborador deletado com sucesso',
    },
    { status: 200 },
  )
}
