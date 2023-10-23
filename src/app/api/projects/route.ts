import { ProjectService } from '@/services'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return NextResponse.json(
    {
      projects: await ProjectService.getAll(),
    },
    { status: 200 },
  )
}

export async function POST(req: NextRequest) {
  const project = await req.json()
  const result = await ProjectService.create(project)

  if (result.error) {
    return NextResponse.json({ message: result.message }, { status: 400 })
  }

  if (!result.project) {
    throw new Error('Algo deu errado')
  }

  return NextResponse.json(
    {
      id: result.project.id,
    },
    { status: 201 },
  )
}
