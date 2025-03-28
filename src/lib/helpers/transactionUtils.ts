import { ITransaction } from '@/src/lib'

export const parseTransaction = (transaction: unknown): ITransaction => {
  // Validate that the input is an object and has required properties
  if (!transaction || typeof transaction !== 'object') {
    throw new Error('Invalid transaction data')
  }

  // Type-safe property extraction with explicit checks
  const { id, type, amount, name, description, date, status, authorizedUser, icon } =
    transaction as Partial<ITransaction>

  // Validate required properties
  if (!id || !type || !amount || !name || !description || !date || !status) {
    throw new Error('Missing required transaction properties')
  }

  // Parse date with error handling
  const parsedDate = new Date(date)
  if (isNaN(new Date(date).getTime())) {
    throw new Error('Invalid date format')
  }

  // Return a fully validated transaction object
  return {
    id,
    type,
    amount: Number(amount),
    name,
    description,
    date: parsedDate,
    status,
    authorizedUser,
    icon,
  }
}
