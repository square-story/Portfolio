"use client"

import type React from "react"
import { useState } from "react"

export interface LeetCodeData {
    status: string
    message: string
    totalSolved: number
    totalQuestions: number
    easySolved: number
    totalEasy: number
    mediumSolved: number
    totalMedium: number
    hardSolved: number
    totalHard: number
    acceptanceRate: number
    ranking: number
    contributionPoints: number
    reputation: number
    submissionCalendar: Record<string, number>
}

export interface LeetCodeHeatmapProps {
    data: LeetCodeData
}

interface TooltipData {
    date: string
    count: number
    x: number
    y: number
}

export function LeetCodeHeatmap({ data }: LeetCodeHeatmapProps) {
    const [tooltip, setTooltip] = useState<TooltipData | null>(null)

    const processData = () => {
        const submissions = Object.entries(data.submissionCalendar)
            .map(([timestamp, count]) => ({
                date: new Date(Number.parseInt(timestamp) * 1000),
                count: count,
            }))
            .sort((a, b) => a.date.getTime() - b.date.getTime())

        return {
            submissions,
            totalSubmissions: submissions.reduce((sum, s) => sum + s.count, 0),
        }
    }

    const { submissions, totalSubmissions } = processData()

    // Find the date range
    const startDate = submissions[0]?.date || new Date()
    const endDate = submissions[submissions.length - 1]?.date || new Date()

    // Create a map for quick lookup
    const submissionMap = new Map(submissions.map((s) => [s.date.toDateString(), s]))

    // Calculate the maximum count for color scaling
    const maxCount = Math.max(...submissions.map((s) => s.count))

    // Generate all weeks from start to end
    const weeks: Date[][] = []
    const currentDate = new Date(startDate)

    // Start from the beginning of the week containing startDate
    currentDate.setDate(currentDate.getDate() - currentDate.getDay())

    while (currentDate <= endDate) {
        const week: Date[] = []
        for (let i = 0; i < 7; i++) {
            week.push(new Date(currentDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }
        weeks.push(week)
    }

    const getColorIntensity = (count: number): string => {
        if (count === 0) return "bg-muted"
        const intensity = Math.min(count / maxCount, 1)

        if (intensity <= 0.2) return "bg-orange-200"
        if (intensity <= 0.4) return "bg-orange-400"
        if (intensity <= 0.6) return "bg-orange-600"
        return "bg-orange-800"
    }

    const handleMouseEnter = (date: Date, count: number, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setTooltip({
            date: date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            count,
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
        })
    }

    const handleMouseLeave = () => {
        setTooltip(null)
    }

    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return (
        <div className="relative">
            <div className="mb-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-card border rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-600">{data.totalSolved}</div>
                        <div className="text-sm text-muted-foreground">Total Solved</div>
                        <div className="text-xs text-muted-foreground">of {data.totalQuestions}</div>
                    </div>

                    <div className="bg-card border rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">{data.easySolved}</div>
                        <div className="text-sm text-muted-foreground">Easy</div>
                        <div className="text-xs text-muted-foreground">of {data.totalEasy}</div>
                    </div>

                    <div className="bg-card border rounded-lg p-4">
                        <div className="text-2xl font-bold text-yellow-600">{data.mediumSolved}</div>
                        <div className="text-sm text-muted-foreground">Medium</div>
                        <div className="text-xs text-muted-foreground">of {data.totalMedium}</div>
                    </div>

                    <div className="bg-card border rounded-lg p-4">
                        <div className="text-2xl font-bold text-red-600">{data.hardSolved}</div>
                        <div className="text-sm text-muted-foreground">Hard</div>
                        <div className="text-xs text-muted-foreground">of {data.totalHard}</div>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-card border rounded-lg p-4">
                        <div className="text-lg font-semibold">{data.acceptanceRate}%</div>
                        <div className="text-sm text-muted-foreground">Acceptance Rate</div>
                    </div>

                    <div className="bg-card border rounded-lg p-4">
                        <div className="text-lg font-semibold">#{data.ranking.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Global Ranking</div>
                    </div>

                    <div className="bg-card border rounded-lg p-4">
                        <div className="text-lg font-semibold">{data.contributionPoints}</div>
                        <div className="text-sm text-muted-foreground">Contribution Points</div>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">Submission Activity</h3>
                <p className="text-sm text-muted-foreground">{totalSubmissions} submissions in the last year</p>
            </div>

            <div className="flex overflow-x-auto">
                {/* Day labels */}
                <div className="flex flex-col mr-2 text-xs text-muted-foreground">
                    <div className="h-4"></div> {/* Spacer for month labels */}
                    {dayLabels.map((day, index) => (
                        <div
                            key={day}
                            className="h-3 flex items-center"
                            style={{
                                visibility: index % 2 === 1 ? "visible" : "hidden",
                            }}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col">
                    {/* Month labels */}
                    <div className="flex mb-1 text-xs text-muted-foreground h-4">
                        {weeks.map((week, weekIndex) => {
                            const firstDay = week[0]
                            const isFirstWeekOfMonth = firstDay.getDate() <= 7
                            return (
                                <div key={weekIndex} className="w-3 mr-1">
                                    {isFirstWeekOfMonth && <span>{monthLabels[firstDay.getMonth()]}</span>}
                                </div>
                            )
                        })}
                    </div>

                    {/* Heatmap grid */}
                    <div className="flex gap-1">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-1">
                                {week.map((date, dayIndex) => {
                                    const dateString = date.toDateString()
                                    const submission = submissionMap.get(dateString)
                                    const count = submission?.count || 0
                                    const isInRange = date >= startDate && date <= endDate

                                    return (
                                        <div
                                            key={`${weekIndex}-${dayIndex}`}
                                            className={`w-3 h-3 rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-orange-400 hover:ring-offset-1 ${isInRange ? getColorIntensity(count) : "bg-muted opacity-30"
                                                }`}
                                            onMouseEnter={(e) => isInRange && handleMouseEnter(date, count, e)}
                                            onMouseLeave={handleMouseLeave}
                                        />
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {tooltip && (
                <div
                    className="absolute z-10 bg-popover border rounded-md px-3 py-2 text-sm shadow-md pointer-events-none"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: "translateX(-50%) translateY(-100%)",
                    }}
                >
                    <div className="font-medium">{tooltip.count} submissions</div>
                    <div className="text-muted-foreground">{tooltip.date}</div>
                </div>
            )}
        </div>
    )
}
