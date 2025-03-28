import { Navigate, Route, Routes } from 'react-router-dom'

import { MainLayout } from '@/src/components/templates'
import { routes } from '@/src/lib'
import { TransactionDetail, TransactionsList } from '@/src/pages'

const { transactions, transactionDetail } = routes

const AppRouter = () => (
  <Routes>
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Navigate to={transactions} replace />} />
      <Route path={transactions} element={<TransactionsList />} />
      <Route path={`${transactionDetail}/:id`} element={<TransactionDetail />} />
      <Route path='*' element={<Navigate to={transactions} replace />} />
    </Route>
  </Routes>
)

export default AppRouter
