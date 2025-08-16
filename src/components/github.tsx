"use client";

import { Activity, ActivityCalendar } from "react-activity-calendar";
import { memo, useCallback, useEffect, useState } from "react";

import { useTheme } from "next-themes";

/**
 * Props for the GitHub contribution graph component
 */
type GithubGraphProps = {
  /** GitHub username to fetch contributions for */
  username: string;
  /** Margin between contribution blocks in pixels */
  blockMargin?: number;
  /** Custom color palette for light theme */
  lightColorPalette?: string[];
  /** Custom color palette for dark theme */
  darkColorPalette?: string[];
};

/**
 * API response type for GitHub contributions
 */
type GithubApiResponse = {
  data: Activity[];
  error?: string;
};

const DEFAULT_LIGHT_PALETTE = [
  "#ebedf0", // Lightest
  "#c6e48b", // Light green
  "#7bc96f", // Medium green
  "#239a3b", // Dark green
  "#196127", // Darkest green
];

const DEFAULT_DARK_PALETTE = [
  "#161b22", // Lightest (dark mode)
  "#0e4429", // Light green (dark mode)
  "#006d32", // Medium green (dark mode)
  "#26a641", // Dark green (dark mode)
  "#39d353", // Darkest green (dark mode)
];

/**
 * GitHub contribution graph component that displays user's contribution activity
 */
export const GithubGraph = memo(({
  username,
  blockMargin,
  lightColorPalette = DEFAULT_LIGHT_PALETTE,
  darkColorPalette = DEFAULT_DARK_PALETTE,
}: GithubGraphProps) => {
  const [contribution, setContribution] = useState<Activity[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const contributions = await fetchContributionData(username);
      setContribution(contributions);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch contribution data");
      setContribution([]);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const label = {
    totalCount: `{{count}} contributions in the last year`,
  };

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg">
          <div className="p-4">
            <div className="mb-4">
              <div className="h-4 bg-muted rounded w-48 animate-pulse"></div>
            </div>
            <div className="overflow-hidden">
              <div className="grid grid-cols-53 gap-1">
                {/* Generate skeleton blocks for the heatmap */}
                {Array.from({ length: 365 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 bg-muted rounded-sm animate-pulse"
                    style={{
                      animationDelay: `${(index % 10) * 100}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="w-3 h-3 bg-muted rounded-sm animate-pulse"
                      style={{
                        animationDelay: `${level * 100}ms`,
                      }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="rounded-lg py-4">
        <div className="overflow-hidden">
          <ActivityCalendar
            data={contribution}
            maxLevel={4}
            blockMargin={blockMargin ?? 2}
            loading={loading}
            labels={label}
            theme={{
              light: lightColorPalette,
              dark: darkColorPalette,
            }}
            colorScheme={theme === "dark" ? "dark" : "light"}
          />
        </div>
      </div>
    </div>
  );
});

GithubGraph.displayName = "GithubGraph";

/**
 * Fetches GitHub contribution data for a given username
 */
async function fetchContributionData(username: string): Promise<Activity[]> {
  try {
    const response = await fetch(`https://github.vineet.pro/api/${username}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let responseBody: GithubApiResponse;
    try {
      responseBody = await response.json();
    } catch (parseError) {
      throw new Error("Failed to parse response data", { cause: parseError as Error });
    }

    if (!responseBody.data) {
      throw new Error("No contribution data received");
    }

    return responseBody.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching GitHub contributions:", error.message);
      return [];
    }
    console.error("An unexpected error occurred while fetching GitHub contributions");
    return [];
  }
}