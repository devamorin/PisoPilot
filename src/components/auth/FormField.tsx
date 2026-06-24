import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { cn } from '../../lib/utils'

interface FormFieldProps<T extends FieldValues> {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  error?: FieldError
  type?: string
  placeholder?: string
  required?: boolean
}

export function FormField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder,
  required = false,
}: FormFieldProps<T>) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className={cn(
          'font-label-caps text-on-surface-variant block',
          required && 'after:content-["*"] after:ml-0.5 after:text-error'
        )}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={cn(
          'w-full px-4 py-3 rounded-lg border bg-background text-on-background',
          'placeholder:text-on-surface-variant',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'transition-all',
          error ? 'border-error' : 'border-surface-variant',
          error && 'focus:ring-error'
        )}
      />
      {error && (
        <p className="font-body-sm text-error">{error.message}</p>
      )}
    </div>
  )
}
