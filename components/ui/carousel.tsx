'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarouselProps {
    items: string[]
    className?: string
}

export function Carousel({ items, className }: CarouselProps) {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(0)

    // Helper to determine if item is a video
    const isVideo = (url: string) => {
        return url.match(/\.(mp4|webm|ogg)$/i) || url.includes('cloudinary') // assuming cloudinary links in data.ts are videos as per context
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    }

    const swipeConfidenceThreshold = 10000
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity
    }

    const paginate = (newDirection: number) => {
        const nextIndex = current + newDirection
        if (nextIndex >= 0 && nextIndex < items.length) {
            setDirection(newDirection)
            setCurrent(nextIndex)
        } else if (nextIndex < 0) {
            setDirection(newDirection)
            setCurrent(items.length - 1)
        } else if (nextIndex >= items.length) {
            setDirection(newDirection)
            setCurrent(0)
        }
    }

    return (
        <div className={cn('relative h-full w-full overflow-hidden', className)}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x)

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1)
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1)
                        }
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {isVideo(items[current]) ? (
                        <video
                            src={items[current]}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <img
                            src={items[current]}
                            alt={`Slide ${current + 1}`}
                            className="h-full w-full object-cover"
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
                <>
                    <button
                        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black backdrop-blur-sm hover:bg-white"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black backdrop-blur-sm hover:bg-white"
                        onClick={() => paginate(1)}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > current ? 1 : -1)
                                    setCurrent(index)
                                }}
                                className={cn(
                                    "h-2 w-2 rounded-full transition-colors",
                                    index === current ? "bg-white" : "bg-white/50"
                                )}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
