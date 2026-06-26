import { Transaction } from '@/types'
import { CATEGORY_COLORS } from '@/lib/constants'
import { format } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'
import Button from '@/components/common/Button'

interface TransactionCardProps {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (id: number) => void
}

const TransactionCard = ({ transaction, onEdit, onDelete }: TransactionCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: CATEGORY_COLORS[transaction.category as keyof typeof CATEGORY_COLORS] || '#6b7280' }}
            >
              {transaction.category}
            </span>
            <span className="text-xs text-gray-500">
              {format(new Date(transaction.transaction_date), 'MMM dd, yyyy')}
            </span>
          </div>
          
          {transaction.notes && (
            <p className="text-sm text-gray-600 mb-2">{transaction.notes}</p>
          )}
          
          <p className="text-lg font-semibold text-gray-900">
            ₱{transaction.amount.toFixed(2)}
          </p>
        </div>
        
        <div className="flex flex-col gap-1 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(transaction)}
            className="p-1.5"
          >
            <Pencil className="h-4 w-4 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(transaction.id)}
            className="p-1.5"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TransactionCard
