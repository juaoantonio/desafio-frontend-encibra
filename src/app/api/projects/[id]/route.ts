import { idParamSchema } from '@/schemas'
import { ProjectService } from '@/services'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params

  const project = await ProjectService.getById(+id)

  if (!project) {
    return NextResponse.json(
      {
        message: 'Projeto não encontrado',
      },
      { status: 404 },
    )
  }

  return NextResponse.json(
    {
      project,
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
  const project = await req.json()

  const resultUpdate = await ProjectService.update(+id, project)

  if (!resultUpdate) {
    return NextResponse.json(
      {
        message: 'Projeto não encontrado',
      },
      { status: 404 },
    )
  }

  return NextResponse.json(
    {
      message: 'Projeto atualizado com sucesso',
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

  const resultDelete = await ProjectService.delete(+id)

  if (!resultDelete) {
    return NextResponse.json(
      {
        message: 'Projeto não encontrado',
      },
      { status: 404 },
    )
  }

  return NextResponse.json(
    {
      message: 'Projeto deletado com sucesso',
    },
    { status: 200 },
  )
}
