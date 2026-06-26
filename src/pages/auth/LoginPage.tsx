import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Wallet, AlertCircle, Mail } from 'lucide-react'
import { Button } from '../../components/auth/Button'
import { FormField } from '../../components/auth/FormField'
import { useAuth } from '../../context/AuthContext'

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
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [requiresVerification, setRequiresVerification] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState('')

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
    setRequiresVerification(false)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        // Store token and user in AuthContext
        login(result.token, result.user)
        
        // Navigate to dashboard
        navigate('/dashboard')
      } else if (result.requiresVerification) {
        // Account not verified
        setRequiresVerification(true)
        setVerificationEmail(result.email || data.email)
        setApiError('Please verify your email before logging in')
      } else {
        setApiError(result.error || 'Invalid email or password. Please try again.')
      }
    } catch (error) {
      setApiError('Failed to login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerification = () => {
    // Navigate to register page with email pre-filled for verification
    navigate('/verify', { state: { email: verificationEmail } })
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
            Welcome back
          </h1>
          <p className="text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        {/* API Error */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-600">{apiError}</p>
              {requiresVerification && (
                <button
                  onClick={handleResendVerification}
                  className="mt-2 text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  Resend verification code
                </button>
              )}
            </div>
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
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span className="text-sm text-gray-600">
                Remember me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
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
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">
            or
          </span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
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
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  )
}
