import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Icon, type IconName } from '@/src/components/atoms'
import { formatPoints, formatTransactionDate, routes } from '@/src/lib'
import { useWalletStore } from '@/src/store'

const { transactionDetail } = routes

const TransactionsList = () => {
  const walletData = useWalletStore(state => state.walletData)
  const loadTransactionsFromJSON = useWalletStore(state => state.loadTransactionsFromJSON)
  const calculateCurrentDailyPoints = useWalletStore(state => state.calculateCurrentDailyPoints)

  useEffect(() => {
    loadTransactionsFromJSON()
    calculateCurrentDailyPoints()
  }, [calculateCurrentDailyPoints, loadTransactionsFromJSON])

  const { cardLimit, cardBalance, transactions, dailyPoints } = walletData

  // Payment due calculation
  const paymentDue = cardLimit - cardBalance
  const noPaymentDue = paymentDue >= 0

  return (
    <div className='min-h-screen p-4'>
      <div className='mx-auto max-w-2xl space-y-4'>
        {/* Top Card: Card Balance + Payment Due + Available */}
        <div className='flex justify-between gap-2'>
          <div className='flex flex-col gap-2 w-1/2'>
            <div className='bg-white shadow-md rounded-lg p-4'>
              {/* Current Balance */}
              <h2 className='font-semibold'>Card Balance</h2>
              <div className='text-2xl font-bold'>${cardBalance.toFixed(2)}</div>
              {/* Available (limit - balance) */}
              <div className='mt-1 text-gray-400 text-sm font-semibold'>${paymentDue.toFixed(2)} Available</div>
            </div>
            {/* Daily Points Block */}
            <div className='bg-white shadow-md rounded-lg p-4'>
              <div className='text-sm font-semibold'>Daily Points</div>
              <div className='text-sm font-medium text-gray-400'>{formatPoints(dailyPoints)}</div>
            </div>
          </div>
          <div className='bg-white shadow-md rounded-lg p-4 w-1/2 flex flex-col justify-between'>
            {/* Payment Due or No Payment Due */}
            {noPaymentDue ? (
              <>
                <div>
                  <div className='text-green-600 text-sm font-semibold'>No Payment Due</div>
                  <div className='text-xs text-gray-400 font-semibold'>{`You've paid your balance.`}</div>
                </div>
                <Icon name='check' className='text-green-600 self-end' size='xl' />
              </>
            ) : (
              <>
                <div className='text-red-600 text-sm font-semibold'>Payment Due: ${paymentDue.toFixed(2)}</div>
                <Icon name='danger' className='text-red-600 self-end' size='xl' />
              </>
            )}
          </div>
        </div>

        {/* Latest Transactions */}
        <div>
          <h2 className='text-lg font-bold mb-2'>Latest Transactions</h2>
          <div className='bg-white shadow-md rounded-lg'>
            <ul className='divide-y divide-gray-200'>
              {transactions
                .slice(0, 10)
                .map(({ id, type, status, icon, amount, date, description, name, authorizedUser }) => {
                  const displayDate = formatTransactionDate(date)
                  const isPayment = type === 'Payment'
                  const isPending = status === 'Pending'

                  return (
                    <li key={id}>
                      {/* Wrap each item in a Link to the detail page */}
                      <Link
                        to={`${transactionDetail}/${id}`}
                        className='flex items-start justify-between p-4 hover:bg-gray-50'
                      >
                        {/* Left side: Icon + info */}
                        <div className='flex items-start space-x-3'>
                          {/* Icon in a subtle circle */}
                          <div className='bg-gray-600 rounded-md h-12 w-12 flex justify-center items-center'>
                            <Icon
                              name={(icon || (isPayment ? 'wallet' : 'credit-card')) as IconName}
                              size='xl'
                              color='primary'
                            />
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
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsList
