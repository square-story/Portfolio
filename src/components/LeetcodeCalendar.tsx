"use client"
import { useEffect, useState } from "react"
import { LeetCodeData, LeetCodeHeatmap } from "./SubmissionHeatmap"
import { Reveal } from "./reveal"

export default function LeetcodeCalendar({ username }: { username?: string }) {
    const [data, setData] = useState<LeetCodeData>({} as LeetCodeData)
    const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
                const json = await data.json()
                console.log(json)
                setData(json)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()

    }, [username])

    if (isloading) return <div>Loading...</div>
    return (
        <Reveal>
            <div className="sm:p-4">
                <LeetCodeHeatmap data={data} />
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-muted"></div>
                        <div className="w-3 h-3 rounded-sm bg-orange-200"></div>
                        <div className="w-3 h-3 rounded-sm bg-orange-400"></div>
                        <div className="w-3 h-3 rounded-sm bg-orange-600"></div>
                        <div className="w-3 h-3 rounded-sm bg-orange-800"></div>
                    </div>
                    <span>More</span>
                </div>
            </div>
        </Reveal>
    )
}