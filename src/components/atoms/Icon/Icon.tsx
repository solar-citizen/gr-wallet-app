import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { colorClasses, IconColor, iconMap, IconName, IconSize, sizeClasses } from './lib'

type IconProps = {
  name: IconName
  size?: IconSize
  color?: IconColor
  className?: string
}

const Icon = ({ name, size = 'md', color = 'secondary', className = '' }: IconProps) => {
  const iconDefinition = iconMap[name]

  return (
    <FontAwesomeIcon
      icon={iconDefinition}
      className={`
        ${sizeClasses[size]} 
        ${colorClasses[color]} 
        ${className}
      `}
    />
  )
}

export default Icon
