import { ExpenseCategory } from '@/types'

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Food',
  'Transport',
  'School',
  'Entertainment',
  'Bills',
  'Shopping',
  'Health',
  'Others',
]

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: '#ef4444',
  Transport: '#f97316',
  School: '#eab308',
  Entertainment: '#22c55e',
  Bills: '#3b82f6',
  Shopping: '#8b5cf6',
  Health: '#ec4899',
  Others: '#6b7280',
}

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
