import React, { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'

type SelectInputProps = ComponentProps<'select'> & {
  name: string
  options: string[]
  error?: string
}

export function SelectInput({
  children,
  name,
  options,
  error,
  ...props
}: SelectInputProps) {
  const { register } = useFormContext()

  return (
    <div>
      <label className="block text-gray-800 font-medium">
        {children}
        <select
          className="block rounded-lg border border-gray-950/10 h-10 w-full px-3 py-2 text-gray-800 focus:outline-none focus:border-gray-950/20 invalid:border-red-500 invalid:ring-red-500 mt-2"
          {...register(name)}
          {...props}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </label>
    </div>
  )
}
