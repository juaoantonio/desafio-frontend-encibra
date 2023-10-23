import { idParamSchema } from '@/schemas'
import { CollaboratorService } from '@/services'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params
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
  const { id } = params
  const collaborator = await req.json()
  console.log(collaborator)

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
  const { id } = params

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
