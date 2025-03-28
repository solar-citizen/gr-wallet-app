import { format, isWithinInterval, subWeeks } from 'date-fns'

export const formatTransactionDate = (date: Date): string => {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  } else if (
    isWithinInterval(date, {
      start: subWeeks(today, 1),
      end: today,
    })
  ) {
    return format(date, 'EEEE') // Full day name (e.g., Monday, Tuesday)
  } else {
    return format(date, 'MM/dd/yy')
  }
}
