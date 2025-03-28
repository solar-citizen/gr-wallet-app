import { useNavigate } from 'react-router-dom'

import { Icon } from '@/src/components/atoms'

interface BackButtonProps {
  className?: string
  iconCls?: string
  onClick?: () => void
}

const BackButton = ({ className = '', iconCls = '', onClick }: BackButtonProps) => {
  const navigate = useNavigate()

  const handleClick = async () => {
    if (onClick) {
      onClick()
    } else {
      await navigate(-1)
    }
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`
        flex items-center justify-center 
        w-10 h-10 
        rounded-full 
        hover:bg-gray-200 
        transition-colors 
        duration-200 
        focus:outline-none 
        focus:ring-2 
        focus:ring-gray-300
        ${className}
      `}
    >
      <Icon name='chevron-left' className={`text-gray-700 font-bold ${iconCls}`} size='xl' />
    </button>
  )
}

export default BackButton
