'use client'

import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import { ActivityCalendar, Activity } from 'react-activity-calendar'
import { Skeleton } from '@/components/ui/skeleton'

type GithubCalendarWidgetProps = {
  username: string
  blockMargin?: number
  blockSize?: number
}

export default function GithubCalendarWidget({
  username,
  blockMargin = 4,
  blockSize = 12,
}: GithubCalendarWidgetProps) {
  const { resolvedTheme } = useTheme()
  const [data, setData] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => res.json())
      .then((res) => {
        if (res.contributions) {
          setData(res.contributions)
        } else {
          setData([])
        }
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [username])

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
  if (loading) {
    return (
      <div className="w-full space-y-4">
        <Skeleton className="h-[128px] w-full rounded-md" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      </div>
    )
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
