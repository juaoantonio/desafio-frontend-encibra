'use client'

import { Form } from '@/components/Form'
import { CollaboratorSchema } from '@/schemas/collaborator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Collaborator } from '@prisma/client'
import { X, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'

type CollaboratorFormProps = z.infer<typeof CollaboratorSchema>

type FormField = {
  name: keyof CollaboratorFormProps
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
    name: 'email',
    type: 'text',
    label: 'Email',
  },
  {
    name: 'password',
    type: 'text',
    label: 'Senha',
  },
  {
    name: 'gender',
    type: 'text',
    label: 'Gênero',
  },
  {
    name: 'age',
    type: 'number',
    label: 'Idade',
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Telefone',
  },
  {
    name: 'salary',
    type: 'number',
    label: 'Salário',
  },
  {
    name: 'address',
    type: 'text',
    label: 'Endereço',
  },
  {
    name: 'imgUrl',
    type: 'text',
    label: 'URL da foto',
  },
]

export function UpdateCollaboratorForm({
  actualCollaborator,
}: {
  actualCollaborator: Collaborator
}) {
  const router = useRouter()

  const methods = useForm<CollaboratorFormProps>({
    resolver: zodResolver(CollaboratorSchema),
    defaultValues: actualCollaborator,
  })

  const {
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = methods

  async function updateCollaborator(data: CollaboratorFormProps) {
    console.log(data)

    const response = await fetch(
      `/api/collaborators/${actualCollaborator.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
    )
    const errorResponse = await response.json()

    if (!response.ok) {
      setError('root', {
        message: errorResponse.message,
      })

      return
    }

    router.refresh()
    router.push('/dashboard/colaboradores')
  }

  return (
    <FormProvider {...methods}>
      <Form.Wrapper className="max-w-xl">
        <Form.Title>Editar colaborador</Form.Title>
        <Form.Root onSubmit={handleSubmit(updateCollaborator)}>
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

            <Form.SelectInput
              options={['CLT', 'PJ']}
              name={'employmentType'}
              error={errors.employmentType?.message}
            >
              Tipo de contratação
            </Form.SelectInput>

            <div>
              <Form.CheckboxInput name="manager">É gestor?</Form.CheckboxInput>
              {errors.manager?.message && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.manager?.message}
                </p>
              )}
            </div>

            <div>
              <Form.FieldArraySelect
                name="fieldOfWork"
                label="Área(s) de atuação"
                type="text"
                options={[
                  'BACKEND',
                  'FRONTEND',
                  'DEVOPS',
                  'DESIGN',
                  'MANAGEMENT',
                  'REQUIREMENTS',
                ]}
                defaultValue={'BACKEND'}
              />
              {errors.fieldOfWork && (
                <span className="text-red-500 text-sm block mt-2">
                  {errors.fieldOfWork?.root?.message}
                </span>
              )}
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
