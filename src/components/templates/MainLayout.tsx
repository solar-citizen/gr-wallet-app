import { Outlet } from 'react-router-dom'

const MainLayout = () => (
  <main className='flex-1 min-h-screen flex flex-col max-w-full sm:max-w-3/5 m-auto'>
    <Outlet />
  </main>
)

export default MainLayout
