import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Wallet, AlertCircle } from 'lucide-react'
import { Button } from '../../components/auth/Button'
import { FormField } from '../../components/auth/FormField'
import { useAuth } from '../../context/AuthContext'

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
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Store token and user in AuthContext
        login(result.token, result.user)
        
        // Navigate to dashboard
        navigate('/dashboard')
      } else {
        setApiError(result.error || 'Registration failed. Email may already be in use.')
      }
    } catch (error) {
      setApiError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-blue-600 tracking-tight">
          PisoPilot
        </span>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">
            Start tracking your expenses today
          </p>
        </div>

        {/* API Error */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{apiError}</p>
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
              className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:underline">
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
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">
            or
          </span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
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
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  )
}
