'use client'

import { Form } from '@/components/Form'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CollaboratorSchema } from '@/schemas/collaborator'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'

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
    type: 'password',
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

export function CreateCollaboratorForm() {
  const router = useRouter()

  const methods = useForm<CollaboratorFormProps>({
    resolver: zodResolver(CollaboratorSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fieldOfWork',
  } as { name: any; control: any })

  function addNewTag() {
    append('')
  }

  async function createCollaborator(data: any) {
    const response = await fetch('/api/collaborators', {
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
    router.push('/dashboard/colaboradores')
  }

  return (
    <FormProvider {...methods}>
      <Form.Wrapper className="max-w-xl">
        <Form.Title>Criar novo colaborador</Form.Title>
        <Form.Root onSubmit={handleSubmit(createCollaborator)}>
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

            <div className="">
              <label className="block text-gray-800 font-medium">
                Áreas de Atuação:
              </label>

              <div>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-4">
                    <Form.SelectInput
                      name={`fieldOfWork.${index}`}
                      options={[
                        'BACKEND',
                        'FRONTEND',
                        'DEVOPS',
                        'DESIGN',
                        'MANAGEMENT',
                        'REQUIREMENTS',
                      ]}
                      className="flex-1"
                    />
                    <button onClick={() => remove(index)} type="button">
                      <X
                        width={24}
                        height={24}
                        className="bg-red-500 stroke-gray-100 rounded-full"
                      />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addNewTag}
                type="button"
                className="py-1 px-4 bg-gray-950 rounded-md mt-4"
              >
                <Plus width={32} height={32} className="stroke-gray-100" />
              </button>
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
