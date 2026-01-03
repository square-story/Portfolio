import { useTheme } from 'next-themes'
import { useMemo, useState, useEffect } from 'react'
import { ActivityCalendar, Activity } from 'react-activity-calendar'



export default function GithubCalendarWidget({
  data,
  blockMargin = 4,
  blockSize = 12,
}: {
  data: Activity[]
  blockMargin?: number
  blockSize?: number
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const labels = useMemo(
    () => ({
      totalCount: '{{count}} contributions in the last year',
      legend: {
        less: 'Less',
        more: 'More',
      },
    }),
    [],
  )

  if (!mounted) {
    return null
  }

  return (
    <ActivityCalendar
      data={data}
      blockMargin={blockMargin}
      blockSize={blockSize}
      weekStart={0}
      colorScheme={resolvedTheme as 'light' | 'dark'}
      showWeekdayLabels
      labels={labels}
    />
  )
}
