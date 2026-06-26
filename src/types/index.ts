// User Types
export interface User {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Transaction Types
export interface Transaction {
  id: number
  user_id: number
  amount: number
  category: string
  notes: string | null
  transaction_date: string
  created_at: string
  updated_at: string
}

export interface CreateTransactionInput {
  amount: number
  category: string
  notes?: string
  transaction_date: string
}

export interface UpdateTransactionInput {
  amount?: number
  category?: string
  notes?: string
  transaction_date?: string
}

// Budget Types
export interface Budget {
  id: number
  user_id: number
  monthly_budget: number
  month: number
  year: number
  created_at: string
  updated_at: string
}

export interface CreateBudgetInput {
  monthly_budget: number
  month: number
  year: number
}

export interface UpdateBudgetInput {
  monthly_budget?: number
  month?: number
  year?: number
}

// Goal Types
export interface Goal {
  id: number
  user_id: number
  goal_name: string
  target_amount: number
  current_amount: number
  target_date: string
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface CreateGoalInput {
  goal_name: string
  target_amount: number
  current_amount?: number
  target_date: string
}

export interface UpdateGoalInput {
  goal_name?: string
  target_amount?: number
  current_amount?: number
  target_date?: string
  status?: 'active' | 'completed' | 'cancelled'
}

// Analytics Types
export interface AnalyticsSummary {
  total_spending: number
  total_transactions: number
  average_spending: number
  budget_remaining: number
  budget_used: number
  budget_percentage: number
}

export interface CategoryBreakdown {
  category: string
  amount: number
  percentage: number
  transaction_count: number
}

export interface SpendingTrend {
  date: string
  amount: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Filter Types
export interface TransactionFilters {
  category?: string
  date_from?: string
  date_to?: string
  search?: string
}

// Category Types
export type ExpenseCategory = 
  | 'Food'
  | 'Transport'
  | 'School'
  | 'Entertainment'
  | 'Bills'
  | 'Shopping'
  | 'Health'
  | 'Others'
