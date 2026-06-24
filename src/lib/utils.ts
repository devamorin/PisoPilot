import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'PHP'): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

export function formatShortDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
  }).format(d)
}

export function getMonthName(month: number): string {
  return new Intl.DateTimeFormat('en-PH', { month: 'long' }).format(
    new Date(2000, month - 1, 1)
  )
}

export function getMonthShortName(month: number): string {
  return new Intl.DateTimeFormat('en-PH', { month: 'short' }).format(
    new Date(2000, month - 1, 1)
  )
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
