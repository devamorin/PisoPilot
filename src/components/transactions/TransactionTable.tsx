import { Transaction } from '../../types'
import { CATEGORY_COLORS } from '../../lib/constants'
import { format } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'
import Button from '../common/Button'

interface TransactionTableProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (id: number) => void
}

const TransactionTable = ({ transactions, onEdit, onDelete }: TransactionTableProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No transactions found</p>
        <p className="text-gray-400 text-sm mt-2">Add your first expense to get started</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Date</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Category</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Notes</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Amount</th>
            <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 text-sm text-gray-600">
                {format(new Date(transaction.transaction_date), 'MMM dd, yyyy')}
              </td>
              <td className="py-3 px-4">
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: CATEGORY_COLORS[transaction.category as keyof typeof CATEGORY_COLORS] || '#6b7280' }}
                >
                  {transaction.category}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                {transaction.notes || '-'}
              </td>
              <td className="py-3 px-4 text-sm font-semibold text-gray-900 text-right">
                ₱{transaction.amount.toFixed(2)}
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex items-center justify-center gap-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
