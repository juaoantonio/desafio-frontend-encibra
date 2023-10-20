import error from 'next/error'
import { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'

type InputProps = ComponentProps<'input'> & {
  name: string
  error?: string
}

export function Input({ children, ...props }: InputProps) {
  const { register } = useFormContext()

  return (
    <div>
      <label className="block space-y-1 text-gray-800 font-medium">
        {children}
        <input
          className="block rounded-lg border border-gray-950/10 h-10 w-full px-3 py-2 text-gray-800 focus:outline-none focus:border-gray-950/20 invalid:border-red-500 invalid:ring-red-500"
          {...register(props.name)}
          {...props}
        />
        {props.error && (
          <span className="text-red-500 text-sm">{props.error}</span>
        )}
      </label>
    </div>
  )
}
