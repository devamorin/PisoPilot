import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import DatePicker from '@/components/common/DatePicker'
import Button from '@/components/common/Button'
import { EXPENSE_CATEGORIES } from '@/lib/constants'
import { CreateTransactionInput, UpdateTransactionInput, Transaction } from '@/types'

const transactionSchema = z.object({
  amount: z
    .number()
    .min(0.01, 'Amount must be greater than 0')
    .max(999999.99, 'Amount is too large'),
  category: z.string().min(1, 'Category is required'),
  transaction_date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
})

type TransactionFormData = z.infer<typeof transactionSchema>

interface TransactionFormProps {
  onSubmit: (data: CreateTransactionInput | UpdateTransactionInput) => void
  onCancel: () => void
  initialData?: Transaction
  isLoading?: boolean
}

const TransactionForm = ({ onSubmit, onCancel, initialData, isLoading }: TransactionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData
      ? {
          amount: initialData.amount,
          category: initialData.category,
          transaction_date: initialData.transaction_date,
          notes: initialData.notes || '',
        }
      : {
          amount: 0,
          category: '',
          transaction_date: format(new Date(), 'yyyy-MM-dd'),
          notes: '',
        },
  })

  const categoryOptions = EXPENSE_CATEGORIES.map((cat) => ({
    value: cat,
    label: cat,
  }))

  const onFormSubmit = (data: TransactionFormData) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <Input
        id="amount"
        label="Amount (₱)"
        type="number"
        step="0.01"
        min="0.01"
        placeholder="0.00"
        error={errors.amount?.message}
        {...register('amount', { valueAsNumber: true })}
      />

      <Select
        id="category"
        label="Category"
        options={categoryOptions}
        error={errors.category?.message}
        {...register('category')}
      />

      <DatePicker
        id="transaction_date"
        label="Date"
        error={errors.transaction_date?.message}
        {...register('transaction_date')}
      />

      <Input
        id="notes"
        label="Notes (Optional)"
        type="text"
        placeholder="Add a note..."
        error={errors.notes?.message}
        {...register('notes')}
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1" isLoading={isLoading}>
          {initialData ? 'Update' : 'Add'} Expense
        </Button>
      </div>
    </form>
  )
}

export default TransactionForm
