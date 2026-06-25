import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Wallet, AlertCircle } from 'lucide-react'
import { Button } from '../../components/auth/Button'
import { FormField } from '../../components/auth/FormField'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setApiError(null)

    try {
      // TODO: Connect to backend API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Login data:', data)
      // On success, navigate to dashboard
      navigate('/dashboard')
    } catch (error) {
      setApiError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
          <Wallet className="w-6 h-6 text-on-primary" />
        </div>
        <span className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">
          PisoPilot
        </span>
      </div>

      {/* Card */}
      <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-8 shadow-lg">
        <div className="mb-8">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
            Welcome back
          </h1>
          <p className="font-body-lg text-on-surface-variant">
            Enter your credentials to access your account
          </p>
        </div>

        {/* API Error */}
        {apiError && (
          <div className="mb-6 p-4 bg-error-container border border-error rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
            <p className="font-body-sm text-error">{apiError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            register={register}
            error={errors.email}
            required
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            register={register}
            error={errors.password}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-surface-variant text-primary focus:ring-primary"
              />
              <span className="font-body-sm text-on-surface-variant">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="font-body-sm text-primary hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            loading={isLoading || isSubmitting}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-surface-variant"></div>
          <span className="px-4 font-body-sm text-on-surface-variant">
            or
          </span>
          <div className="flex-1 border-t border-surface-variant"></div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="font-body-lg text-on-surface-variant">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-body-lg text-primary hover:underline font-medium"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Back to Home */}
      <div className="mt-6 text-center">
        <Link
          to="/"
          className="font-body-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  )
}
