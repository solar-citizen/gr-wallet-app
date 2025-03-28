import { differenceInDays, startOfQuarter } from 'date-fns'

export const getDayOfSeason = (date: Date): number => {
  const seasonStart = startOfQuarter(date)
  return differenceInDays(date, seasonStart) + 1
}

export const calculateDailyPoints = (currentDate: Date = new Date()): number => {
  const dayOfSeason = getDayOfSeason(currentDate)

  // Explicit point calculation based on day of season
  if (dayOfSeason === 1) return 2
  if (dayOfSeason === 2) return 3
  if (dayOfSeason >= 3) return Math.round(2 + 3 * 0.6)

  return 0
}

// Formatting function for points over 1000
export const formatPoints = (points: number): string => {
  return points > 999 ? `${Math.round(points / 1000).toString()}K` : points.toString()
}
