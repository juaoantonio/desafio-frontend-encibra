import { useFormContext } from 'react-hook-form'

type CheckboxInputProps = {
  children: React.ReactNode
  name: string
}

export function CheckboxInput({ children, name }: CheckboxInputProps) {
  const { register } = useFormContext()

  return (
    <div className="p-2">
      <label className="flex text-gray-800 text-lg font-medium items-end gap-2">
        <input
          className="inline-block rounded-lg border border-gray-950/10 h-7 w-7 text-gray-800 focus:outline-none focus:border-gray-950/20 invalid:border-red-500 invalid:ring-red-500"
          type="checkbox"
          {...register(name)}
        />
        {children}
      </label>
    </div>
  )
}
