import { 
  User, 
  AuthResponse, 
  Transaction, 
  CreateTransactionInput, 
  UpdateTransactionInput,
  Budget,
  CreateBudgetInput,
  UpdateBudgetInput,
  Goal,
  CreateGoalInput,
  UpdateGoalInput,
  AnalyticsSummary,
  CategoryBreakdown,
  SpendingTrend,
  TransactionFilters
} from './index'
import { ApiResponse } from './index'

// Auth API Types
export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
  confirm_password: string
}

// Auth API Responses
export type LoginResponse = ApiResponse<AuthResponse>
export type RegisterResponse = ApiResponse<AuthResponse>
export type LogoutResponse = ApiResponse<{ message: string }>
export type ProfileResponse = ApiResponse<User>

// Transaction API Responses
export type TransactionsResponse = ApiResponse<Transaction[]>
export type TransactionResponse = ApiResponse<Transaction>
export type CreateTransactionResponse = ApiResponse<Transaction>
export type UpdateTransactionResponse = ApiResponse<Transaction>
export type DeleteTransactionResponse = ApiResponse<{ message: string }>

// Budget API Responses
export type BudgetsResponse = ApiResponse<Budget[]>
export type BudgetResponse = ApiResponse<Budget>
export type CreateBudgetResponse = ApiResponse<Budget>
export type UpdateBudgetResponse = ApiResponse<Budget>
export type DeleteBudgetResponse = ApiResponse<{ message: string }>

// Goal API Responses
export type GoalsResponse = ApiResponse<Goal[]>
export type GoalResponse = ApiResponse<Goal>
export type CreateGoalResponse = ApiResponse<Goal>
export type UpdateGoalResponse = ApiResponse<Goal>
export type DeleteGoalResponse = ApiResponse<{ message: string }>

// Analytics API Responses
export type AnalyticsSummaryResponse = ApiResponse<AnalyticsSummary>
export type CategoriesResponse = ApiResponse<CategoryBreakdown[]>
export type TrendsResponse = ApiResponse<SpendingTrend[]>
