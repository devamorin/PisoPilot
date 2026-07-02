import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { Mail, RefreshCw } from 'lucide-react'

const otpSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().length(6, 'Verification code must be 6 digits'),
})

type OTPFormData = z.infer<typeof otpSchema>

interface OTPVerificationFormProps {
  onSuccess: () => void
  onResend: (email: string) => void
  defaultEmail?: string
}

const OTPVerificationForm = ({ onSuccess, onResend, defaultEmail = '' }: OTPVerificationFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: defaultEmail,
      code: '',
    },
  })

  const onSubmit = async (data: OTPFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess('Email verified successfully!')
        setTimeout(() => onSuccess(), 1500)
      } else {
        setError(result.error || 'Verification failed')
      }
    } catch (err) {
      setError('Failed to verify email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    const email = defaultEmail || (document.getElementById('email') as HTMLInputElement)?.value
    if (!email) return

    setIsResending(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess('New verification code sent to your email')
      } else {
        setError(result.error || 'Failed to resend code')
      }
    } catch (err) {
      setError('Failed to resend code. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Verify Your Email</h3>
        <p className="text-sm text-gray-600 mt-1">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          id="code"
          label="Verification Code"
          type="text"
          placeholder="123456"
          maxLength={6}
          error={errors.code?.message}
          {...register('code')}
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Verify Email
        </Button>

        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${isResending ? 'animate-spin' : ''}`} />
          {isResending ? 'Sending...' : 'Resend Code'}
        </button>
      </form>
    </div>
  )
}

export default OTPVerificationForm
