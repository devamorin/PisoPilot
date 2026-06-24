import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Wallet, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '../../components/auth/Button'
import { FormField } from '../../components/auth/FormField'

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be less than 50 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setApiError(null)

    try {
      // TODO: Connect to backend API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Register data:', data)
      setSuccess(true)
      
      // Redirect to login after successful registration
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      setApiError('Registration failed. Email may already be in use.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-on-primary-container" />
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
              Registration Successful!
            </h1>
            <p className="font-body-lg text-on-surface-variant mb-6">
              Your account has been created. Redirecting to login...
            </p>
            <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
              <div className="bg-primary h-full animate-[loading_2s_ease-in-out]" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
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
              Create your account
            </h1>
            <p className="font-body-lg text-on-surface-variant">
              Start tracking your expenses today
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              label="Full Name"
              name="name"
              type="text"
              placeholder="Juan Dela Cruz"
              register={register}
              error={errors.name}
              required
            />

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

            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              register={register}
              error={errors.confirmPassword}
              required
            />

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 rounded border-surface-variant text-primary focus:ring-primary"
                required
              />
              <label htmlFor="terms" className="font-body-sm text-on-surface-variant">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              loading={isLoading || isSubmitting}
              className="w-full"
            >
              Create Account
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

          {/* Login Link */}
          <div className="text-center">
            <p className="font-body-lg text-on-surface-variant">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-body-lg text-primary hover:underline font-medium"
              >
                Sign in
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
    </div>
  )
}
