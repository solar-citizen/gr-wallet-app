import { create } from 'zustand'

import walletData from '@/data/wallet-data.json'
import { calculateDailyPoints, ITransaction, IWalletData, parseTransaction } from '@/src/lib'

type WalletState = {
  walletData: IWalletData
  setWalletData: (data: IWalletData) => void
  addTransaction: (transaction: ITransaction) => void
  loadTransactionsFromJSON: () => void
  calculateCurrentDailyPoints: () => void
}

export const useWalletStore = create<WalletState>(set => ({
  walletData: {
    cardLimit: 1500,
    cardBalance: 0,
    dailyPoints: 0,
    transactions: [],
  },

  setWalletData: data => {
    set({ walletData: data })
  },

  addTransaction: transaction => {
    set(state => ({
      walletData: {
        ...state.walletData,
        transactions: [transaction, ...state.walletData.transactions].slice(0, 10),
      },
    }))
  },

  loadTransactionsFromJSON: () => {
    const parsedTransactions = walletData.transactions.map(parseTransaction)

    set({
      walletData: {
        cardLimit: walletData.cardLimit,
        cardBalance: walletData.cardBalance,
        dailyPoints: walletData.dailyPoints,
        transactions: parsedTransactions,
      },
    })
  },

  calculateCurrentDailyPoints: () => {
    const points = calculateDailyPoints()

    set(state => ({
      walletData: {
        ...state.walletData,
        dailyPoints: points,
      },
    }))
  },
}))
