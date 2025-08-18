"use client";

import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import GitHubCalendar, { type Activity } from "react-github-calendar";
import { Reveal } from "./reveal";

type GithubCalendarWidgetProps = {
    username: string;
    blockMargin?: number;
    blockSize?: number;
};

const LIGHT_THEME = [
    "#ebedf0",
    "#c6e48b",
    "#7bc96f",
    "#239a3b",
    "#196127",
];

const DARK_THEME = [
    "#161b22",
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353",
];

export default function GithubCalendarWidget({
    username,
    blockMargin = 4,
    blockSize = 11,
}: GithubCalendarWidgetProps) {
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);

    const colorScheme = theme === "dark" ? "dark" : "light";
    const themePalette = useMemo(() => ({ light: LIGHT_THEME, dark: DARK_THEME }), []);

    const labels = useMemo(
        () => ({
            totalCount: "{{count}} contributions in the last year",
            legend: {
                less: "Less",
                more: "More",
            },
        }),
        []
    );

    const handleTransformData = (data: Array<Activity>) => {
        if (isLoading) setIsLoading(false);
        return data;
    };

    return (
        <Reveal>
            <div className="rounded-lg sm:p-4">
                <GitHubCalendar
                    username={username}
                    transformData={handleTransformData}
                    loading={isLoading}
                    blockMargin={blockMargin}
                    blockSize={blockSize}
                    weekStart={1}
                    showWeekdayLabels
                    hideColorLegend={false}
                    labels={labels}
                    theme={themePalette}
                    colorScheme={colorScheme}
                    errorMessage="Unable to load GitHub contributions"
                />

            </div>
        </Reveal>
    );
}


