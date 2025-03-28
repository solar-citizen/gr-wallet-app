export interface ITransaction {
  id: string
  type: 'Payment' | 'Credit'
  amount: number
  name: string
  description: string
  date: Date
  status: 'Pending' | 'Approved'
  authorizedUser?: string
  icon?: string | undefined
  category?: string
}
