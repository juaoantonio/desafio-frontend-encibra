'use client'

import { Form } from '@/components/Form'
import { ProjectSchema } from '@/schemas/project'
import { zodResolver } from '@hookform/resolvers/zod'
import { Collaborator } from '@prisma/client'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

type ProjectFormProps = z.infer<typeof ProjectSchema>
type FormField = {
  name: keyof ProjectFormProps
  type: string
  label: string
}

const formFields: FormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Nome',
  },
  {
    name: 'description',
    type: 'text',
    label: 'Descrição',
  },
  {
    name: 'deadline',
    type: 'date',
    label: 'Prazo',
  },
]

export function CreateProjectForm({
  collaborators,
}: {
  collaborators: Collaborator[]
}) {
  const backendCollaborators = collaborators.filter((collaborator) =>
    collaborator.fieldOfWork.includes('BACKEND'),
  )
  const frontendCollaborators = collaborators.filter((collaborator) =>
    collaborator.fieldOfWork.includes('FRONTEND'),
  )
  const managerCollaborators = collaborators.filter(
    (collaborator) => collaborator.manager,
  )

  const router = useRouter()

  const methods = useForm<ProjectFormProps>({
    resolver: zodResolver(ProjectSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = methods

  async function createProject(data: ProjectFormProps) {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const errorResponse = await response.json()

    if (!response.ok) {
      setError('root', {
        message: errorResponse.message,
      })

      return
    }

    router.refresh()
    router.push('/dashboard/projects')
  }

  return (
    <FormProvider {...methods}>
      <Form.Wrapper>
        <Form.Title>Criar Projeto</Form.Title>
        <Form.Root onSubmit={handleSubmit(createProject)}>
          <Form.Inputs>
            {formFields.map((field) => (
              <Form.Input
                key={field.name}
                name={field.name}
                type={field.type}
                error={errors[field.name]?.message}
              >
                {field.label}
              </Form.Input>
            ))}

            <Form.FieldArrayInput
              name="technologies"
              label="Tecnologias"
              type="text"
            />

            <div className="space-y-8">
              <Form.FieldArraySelect
                name="frontendCollaborators"
                label="Colaboradores Frontend"
                options={frontendCollaborators.map(
                  (collaborator) => collaborator.email,
                )}
              />

              <Form.FieldArraySelect
                name="backendCollaborators"
                label="Colaboradores Backend"
                options={backendCollaborators.map(
                  (collaborator) => collaborator.email,
                )}
              />
              <Form.FieldArraySelect
                name="managerCollaborators"
                label="Gestores"
                options={managerCollaborators.map(
                  (collaborator) => collaborator.email,
                )}
              />
              <Form.FieldArraySelect
                name="collaborators"
                label="Outros Colaboradores"
                options={collaborators
                  .filter(
                    (collaborator) =>
                      !collaborator.fieldOfWork.includes('BACKEND') &&
                      !collaborator.fieldOfWork.includes('FRONTEND') &&
                      !collaborator.manager,
                  )
                  .map((collaborator) => collaborator.email)}
              />
            </div>
          </Form.Inputs>

          <hr />

          {errors.root?.message && (
            <p className="text-red-500 text-sm font-medium">
              {errors.root?.message}
            </p>
          )}

          <Form.Button>Criar</Form.Button>
        </Form.Root>
      </Form.Wrapper>
    </FormProvider>
  )
}
