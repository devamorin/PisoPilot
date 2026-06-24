import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, loading, variant = 'primary', disabled, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container',
      secondary: 'bg-surface-container text-on-surface hover:bg-surface-variant',
      outline: 'bg-transparent border border-outline text-on-surface hover:bg-surface-variant',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'w-full font-body-lg font-medium px-6 py-3 rounded-full',
          'transition-all active:scale-95',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'flex items-center justify-center gap-2',
          variants[variant],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
