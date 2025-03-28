import { Link } from 'react-router-dom'

import { Icon, type IconName } from '@/src/components/atoms'
import { routes } from '@/src/lib'

type TransactionListItemProps = {
  id: string
  icon?: string
  isPayment: boolean
  isPending: boolean
  name: string
  description: string
  authorizedUser?: string
  displayDate: string
  amount: number
}

const { transactionDetail } = routes

const TransactionListItem = ({
  id,
  icon,
  isPayment,
  isPending,
  name,
  description,
  authorizedUser,
  displayDate,
  amount,
}: TransactionListItemProps) => {
  return (
    <li>
      <Link to={`${transactionDetail}/${id}`} className='flex items-start justify-between p-4 hover:bg-gray-50'>
        {/* Left side: Icon + info */}
        <div className='flex items-start space-x-3'>
          {/* Icon in a subtle circle */}
          <div className='bg-gray-600 rounded-md h-12 w-12 flex justify-center items-center'>
            <Icon name={(icon || (isPayment ? 'wallet' : 'credit-card')) as IconName} size='xl' color='primary' />
          </div>

          <div className='flex flex-col text-sm'>
            <span className='font-semibold'>{isPayment ? 'Payment' : name}</span>
            {/* If pending, add "Pending" before description */}
            <span className='text-gray-500'>
              {isPending ? 'Pending ' : ''}
              {isPayment ? `From ${name}` : description}
            </span>
            {/* If there's an authorized user, show them before the date */}
            <span className='text-gray-500'>
              {authorizedUser ? `${authorizedUser} - ` : ''}
              {displayDate}
            </span>
          </div>
        </div>

        {/* Right side: Type + Amount */}
        <div className='flex flex-col items-end text-right'>
          <span className={`text-sm ${isPayment ? 'text-green-600' : ''} font-semibold`}>
            {isPayment && '+'}${amount.toFixed(2)}
          </span>
          <span className='text-xs text-gray-400'>{isPayment ? 'Payment' : 'Credit'}</span>
        </div>
      </Link>
    </li>
  )
}

export default TransactionListItem
