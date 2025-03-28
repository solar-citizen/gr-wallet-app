import { ITransaction } from '@/src/lib'

export interface IWalletData {
  cardLimit: number
  cardBalance: number
  dailyPoints: number
  transactions: ITransaction[]
}
