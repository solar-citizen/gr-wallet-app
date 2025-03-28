import { faAirbnb, faAlipay, faAmazonPay, faApple } from '@fortawesome/free-brands-svg-icons'
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCreditCard,
  faTriangleExclamation,
  faWallet,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type IconColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
export type IconName =
  | 'apple'
  | 'air-bnb'
  | 'amazon-pay'
  | 'ali-pay'
  | 'credit-card'
  | 'wallet'
  | 'chevron-left'
  | 'chevron-right'
  | 'check'
  | 'danger'

// Mapping of icon names to FontAwesome icons
export const iconMap: Record<IconName, IconDefinition> = {
  apple: faApple,
  wallet: faWallet,
  check: faCheck,
  danger: faTriangleExclamation,
  'air-bnb': faAirbnb,
  'ali-pay': faAlipay,
  'amazon-pay': faAmazonPay,
  'credit-card': faCreditCard,
  'chevron-left': faChevronLeft,
  'chevron-right': faChevronRight,
}

// Size mapping to Tailwind classes
export const sizeClasses: Record<IconSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

// Color mapping to Tailwind classes
export const colorClasses: Record<IconColor, string> = {
  primary: 'text-white',
  secondary: 'text-gray-500',
  success: 'text-green-500',
  danger: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-cyan-500',
}
