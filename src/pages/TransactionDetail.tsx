import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { BackButton } from '@/src/components/atoms'
import { formatTransactionDate } from '@/src/lib'
import { useWalletStore } from '@/src/store'

const TransactionDetail = () => {
  const walletData = useWalletStore(state => state.walletData)

  const loadTransactionsFromJSON = useWalletStore(state => state.loadTransactionsFromJSON)

  useEffect(() => {
    loadTransactionsFromJSON()
  }, [loadTransactionsFromJSON])

  const { id } = useParams<{ id: string }>()

  // Find the transaction by ID
  const transaction = walletData.transactions.find(t => t.id === id)

  // If transaction not found, show fallback
  if (!transaction) {
    return (
      <div className='container mx-auto px-4 py-6'>
        <BackButton />
        <span className='text-2xl font-bold mt-4'>Loading...</span>
      </div>
    )
  }

  const { name, amount, date, description, status, type } = transaction

  return (
    <div className='min-h-screen px-4 py-6'>
      {/* Back Button at the top */}
      <BackButton iconCls='text-sky-500' />

      {/* Parent block containing all details */}
      <div className='bg-white shadow-md rounded-lg p-6 mt-4 space-y-4'>
        {/* First child block: amount, authorizedUser, date (all centered) */}
        <div className='flex flex-col items-center space-y-1'>
          {amount && <span className='text-4xl font-bold'>${amount.toFixed(2)}</span>}

          {name && <span className='text-xs text-gray-500 font-semibold'>{name}</span>}

          <span className='text-xs text-gray-500 font-semibold'>{formatTransactionDate(date)}</span>
        </div>

        {/* Second child block: status, description, separator, total */}
        <div>
          {/* Status */}
          <div className='text-sm'>
            <span className='font-bold text-gray-700'>Status: </span>

            <span
              className={`
                font-semibold
                ${status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}
              `}
            >
              {status}
            </span>
          </div>

          {/* Description (optional) */}
          {description && <span className='text-sm text-gray-500 font-semibold'>{description}</span>}

          {/* Separator line */}
          <hr className='border-gray-200 my-2' />

          {/* Total row */}
          <div className='flex justify-between items-center'>
            <span className='font-semibold'>Total</span>

            {amount && (
              <span
                className={`
              font-semibold
              ${type === 'Payment' ? 'text-green-600' : ''}
            `}
              >
                {type === 'Payment' && '+'}${amount.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetail
