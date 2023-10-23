import { X, Plus } from 'lucide-react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { Form } from '@/components/Form'

type FieldArrayProps = {
  name: string
  label: string
  type: string
}

export function FieldArrayInput({ name, label, type }: FieldArrayProps) {
  const { control } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  return (
    <div className="">
      <h3 className="text-gray-950 font-semibold text-lg">{label}</h3>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 rounded-md">
            <Form.Input type={type} name={`${name}.${index}`} />
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white"
            >
              <X width={16} height={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append('')}
        className="flex items-center gap-2 bg-gray-800 text-gray-50 rounded-md px-4 py-2 mt-4"
      >
        Adicionar
        <Plus width={24} height={24} className="stroke-slate-50" />
      </button>
    </div>
  )
}
