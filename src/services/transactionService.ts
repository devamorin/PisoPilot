import api from './api'
import {
  Transaction,
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionFilters,
  ApiResponse,
} from '@/types'

export const transactionService = {
  // Get all transactions with optional filters
  getTransactions: async (filters?: TransactionFilters): Promise<Transaction[]> => {
    const response = await api.get<ApiResponse<Transaction[]>>('/transactions', {
      params: filters,
    })
    return response.data.data || []
  },

  // Get single transaction by ID
  getTransactionById: async (id: number): Promise<Transaction> => {
    const response = await api.get<ApiResponse<Transaction>>(`/transactions/${id}`)
    return response.data.data!
  },

  // Create new transaction
  createTransaction: async (data: CreateTransactionInput): Promise<Transaction> => {
    const response = await api.post<ApiResponse<Transaction>>('/transactions', data)
    return response.data.data!
  },

  // Update existing transaction
  updateTransaction: async (
    id: number,
    data: UpdateTransactionInput
  ): Promise<Transaction> => {
    const response = await api.put<ApiResponse<Transaction>>(`/transactions/${id}`, data)
    return response.data.data!
  },

  // Delete transaction
  deleteTransaction: async (id: number): Promise<void> => {
    await api.delete(`/transactions/${id}`)
  },
}
