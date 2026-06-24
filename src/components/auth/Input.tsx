import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full px-4 py-3 rounded-lg border bg-background text-on-background',
          'placeholder:text-on-surface-variant',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'transition-all',
          error ? 'border-error' : 'border-surface-variant',
          error && 'focus:ring-error',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
