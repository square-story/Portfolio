'use client'

import { cn } from '@/lib/utils'

type FilterBarProps = {
    categories: string[]
    selectedCategory: string
    onSelectCategory: (category: string) => void
}

export function FilterBar({
    categories,
    selectedCategory,
    onSelectCategory,
}: FilterBarProps) {
    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => onSelectCategory('All')}
                className={cn(
                    'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                    selectedCategory === 'All'
                        ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                )}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={cn(
                        'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                        selectedCategory === category
                            ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                    )}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}
