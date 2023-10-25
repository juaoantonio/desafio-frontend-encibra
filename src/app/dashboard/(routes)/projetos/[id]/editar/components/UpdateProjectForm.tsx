'use client'

import { Form } from '@/components/Form'
import { ProjectSchema } from '@/schemas/project'
import { zodResolver } from '@hookform/resolvers/zod'
import { Collaborator, Project } from '@prisma/client'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

type ProjectWithCollaborators = Project & {
  collaborators: Collaborator[]
}

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

export function UpdateProjectForm({
  actualProject,
  allCollaborators,
}: {
  actualProject: ProjectWithCollaborators
  allCollaborators: Collaborator[]
}) {
  const collaborators = actualProject.collaborators

  const backendCollaborators = collaborators.filter((collaborator) =>
    collaborator.fieldOfWork.includes('BACKEND'),
  )

  const frontendCollaborators = collaborators.filter((collaborator) =>
    collaborator.fieldOfWork.includes('FRONTEND'),
  )

  const managerCollaborators = collaborators.filter(
    (collaborator) => collaborator.manager,
  )
  const otherCollaborators = collaborators.filter(
    (collaborator) =>
      !collaborator.fieldOfWork.includes('BACKEND') &&
      !collaborator.fieldOfWork.includes('FRONTEND') &&
      !collaborator.manager,
  )

  const router = useRouter()

  const methods = useForm<ProjectFormProps>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: actualProject.name,
      description: actualProject.description,
      deadline: new Date(actualProject.deadline),
      backendCollaborators: backendCollaborators.map(
        (collaborator) => collaborator.email,
      ),
      frontendCollaborators: frontendCollaborators.map(
        (collaborator) => collaborator.email,
      ),
      managerCollaborators: managerCollaborators.map(
        (collaborator) => collaborator.email,
      ),
      collaborators: otherCollaborators.map(
        (collaborator) => collaborator.email,
      ),
      technologies: actualProject.technologies,
    },
  })

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods

  async function updateProject(data: ProjectFormProps) {
    const response = await fetch(`/api/projects/${actualProject.id}`, {
      method: 'PUT',
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
    router.push('/dashboard/projetos')
  }

  return (
    <FormProvider {...methods}>
      <Form.Wrapper>
        <Form.Title>Editar Projeto</Form.Title>
        <Form.Root onSubmit={handleSubmit(updateProject)}>
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
              <div>
                <Form.FieldArraySelect
                  name="frontendCollaborators"
                  label="Colaboradores Frontend"
                  options={allCollaborators
                    .filter((collaborator) =>
                      collaborator.fieldOfWork.includes('FRONTEND'),
                    )
                    .map((collaborator) => collaborator.email)}
                />
                {errors.frontendCollaborators && (
                  <span className="text-red-500 text-sm block mt-2">
                    {errors.frontendCollaborators?.root?.message}
                  </span>
                )}
              </div>

              <div>
                <Form.FieldArraySelect
                  name="backendCollaborators"
                  label="Colaboradores Backend"
                  options={allCollaborators
                    .filter((collaborator) =>
                      collaborator.fieldOfWork.includes('BACKEND'),
                    )
                    .map((collaborator) => collaborator.email)}
                />

                {errors.backendCollaborators && (
                  <span className="text-red-500 text-sm block mt-2">
                    {errors.backendCollaborators?.root?.message}
                  </span>
                )}
              </div>

              <div>
                <Form.FieldArraySelect
                  name="managerCollaborators"
                  label="Gestores"
                  options={allCollaborators
                    .filter((collaborator) => collaborator.manager)
                    .map((collaborator) => collaborator.email)}
                />
                {errors.managerCollaborators && (
                  <span className="text-red-500 text-sm block mt-2">
                    {errors.managerCollaborators?.root?.message}
                  </span>
                )}
              </div>
              <div>
                <Form.FieldArraySelect
                  name="collaborators"
                  label="Outros Colaboradores"
                  options={allCollaborators
                    .filter(
                      (collaborator) =>
                        !collaborator.fieldOfWork.includes('BACKEND') &&
                        !collaborator.fieldOfWork.includes('FRONTEND') &&
                        !collaborator.manager,
                    )
                    .map((collaborator) => collaborator.email)}
                />

                {errors.collaborators && (
                  <span className="text-red-500 text-sm block mt-2">
                    {errors.collaborators?.root?.message}
                  </span>
                )}
              </div>
            </div>
          </Form.Inputs>

          <hr />

          {errors.root?.message && (
            <p className="text-red-500 text-sm font-medium">
              {errors.root?.message}
            </p>
          )}

          <Form.Button>Atualizar</Form.Button>
        </Form.Root>
      </Form.Wrapper>
    </FormProvider>
  )
}
