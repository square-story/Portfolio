import { memo, useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type PanInfo,
  MotionValue,
} from 'motion/react'
import Image from 'next/image'
import { Disclosure, DisclosureTrigger, DisclosureContent } from '@/components/motion-primitives/disclosure'

// Fix 4 — module-scope constants (not recreated per render)
const imageVariants = {
  collapsed: { scale: 1, filter: 'blur(0px)' },
  expanded: { scale: 1.1, filter: 'blur(3px)' },
}

const contentVariants = {
  collapsed: { opacity: 0, y: 0 },
  expanded: { opacity: 1, y: 0 },
}

const disclosureTransition = {
  type: 'spring',
  stiffness: 26.7,
  damping: 4.1,
  mass: 0.2,
}

export interface CoverFlowItem {
  id: string | number
  image: string
  title: string
  subtitle?: string
}

export interface CoverFlowProps {
  items: CoverFlowItem[]
  itemWidth?: number
  itemHeight?: number
  stackSpacing?: number
  centerGap?: number
  rotation?: number
  initialIndex?: number
  enableReflection?: boolean
  enableClickToSnap?: boolean
  enableScroll?: boolean
  scrollThreshold?: number
  className?: string
  onItemClick?: (item: CoverFlowItem, index: number) => void
  onIndexChange?: (index: number) => void
}

export function CoverFlow({
  items,
  itemWidth = 400,
  itemHeight = 400,
  stackSpacing = 100,
  centerGap = 250,
  rotation = 50,
  initialIndex = 0,
  enableReflection = false,
  enableClickToSnap = true,
  enableScroll = true,
  scrollThreshold = 100,
  className,
  onItemClick,
  onIndexChange,
}: CoverFlowProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const enableScrollRef = useRef(enableScroll)
  const scrollThresholdRef = useRef(scrollThreshold)
  const scrollX = useMotionValue(initialIndex)
  const springX = useSpring(scrollX, {
    stiffness: 150,
    damping: 30,
    mass: 1,
  })

  useEffect(() => {
    setActiveIndex(initialIndex)
    scrollX.set(initialIndex)
  }, [initialIndex, scrollX])

  useEffect(() => {
    onIndexChange?.(activeIndex)
  }, [activeIndex, onIndexChange])

  useEffect(() => {
    enableScrollRef.current = enableScroll
  }, [enableScroll])

  useEffect(() => {
    scrollThresholdRef.current = scrollThreshold
  }, [scrollThreshold])

  const jumpToIndex = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), items.length - 1)
      setActiveIndex(clamped)
      scrollX.set(clamped)
    },
    [items.length, scrollX],
  )

  const stableOnItemClick = useCallback(
    (item: CoverFlowItem, index: number) => {
      onItemClick?.(item, index)
    },
    [onItemClick],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let wheelAccumulator = 0
    let lastWheelTime = Date.now()

    const handleWheel = (e: WheelEvent) => {
      if (!enableScrollRef.current) return

      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX)

      if (isVerticalScroll) {
        return
      }

      e.preventDefault()

      const now = Date.now()
      if (now - lastWheelTime > 200) {
        wheelAccumulator = 0
      }
      lastWheelTime = now
      wheelAccumulator += e.deltaX

      const threshold = scrollThresholdRef.current

      if (wheelAccumulator > threshold) {
        const currentIndex = Math.round(scrollX.get())
        jumpToIndex(currentIndex + 1)
        wheelAccumulator = 0
      } else if (wheelAccumulator < -threshold) {
        const currentIndex = Math.round(scrollX.get())
        jumpToIndex(currentIndex - 1)
        wheelAccumulator = 0
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [jumpToIndex, scrollX])

  const onDragStart = () => {
    setIsDragging(true)
  }

  const onDrag = (event: any, info: PanInfo) => {
    const deltaIndex = -info.delta.x / (centerGap * 0.8)

    const current = springX.get()
    scrollX.set(current + deltaIndex)
  }

  const onDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)
    const current = springX.get()
    const velocity = info.velocity.x

    const projected = current - velocity * 0.002

    const targetIndex = Math.round(projected)
    const clampedIndex = Math.min(Math.max(targetIndex, 0), items.length - 1)

    setActiveIndex(clampedIndex)
    scrollX.set(clampedIndex)
  }

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        jumpToIndex(activeIndex - 1)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        jumpToIndex(activeIndex + 1)
      }
    },
    [activeIndex, jumpToIndex],
  )
  if (items.length === 0) {
    return null
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-transparent focus:outline-none touch-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className ?? ''}`}
      style={{ perspective: 1000 }}
      role="region"
      aria-label="Cover Flow"
      tabIndex={0}
      onKeyDown={onKeyDown}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    >
      <div
        className="relative w-full flex items-center justify-center pointer-events-none"
        style={{ transformStyle: 'preserve-3d', height: itemHeight + 80 }}
      >
        {items.map((item, index) => (
          <CoverFlowItemCard
            key={item.id}
            item={item}
            index={index}
            scrollX={springX}
            width={itemWidth}
            height={itemHeight}
            stackSpacing={stackSpacing}
            centerGap={centerGap}
            rotation={rotation}
            isActive={index === activeIndex}
            activeIndex={activeIndex}
            enableReflection={enableReflection}
            enableClickToSnap={enableClickToSnap}
            isDragging={isDragging}
            onJumpToIndex={jumpToIndex}
            onItemClick={stableOnItemClick}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Fix 2 — updated CardProps: onClick removed, added activeIndex/onJumpToIndex/onItemClick
interface CardProps {
  item: CoverFlowItem
  index: number
  scrollX: MotionValue<number>
  width: number
  height: number
  stackSpacing: number
  centerGap: number
  rotation: number
  isActive: boolean
  activeIndex: number
  enableReflection: boolean
  enableClickToSnap: boolean
  isDragging: boolean
  onJumpToIndex: (index: number) => void
  onItemClick?: (item: CoverFlowItem, index: number) => void
}

// Fix 2 — wrapped in memo() to prevent re-renders on isDragging toggle
const CoverFlowItemCard = memo(function CoverFlowItemCard({
  item,
  index,
  scrollX,
  width,
  height,
  stackSpacing,
  centerGap,
  rotation,
  isActive,
  activeIndex,
  enableReflection,
  enableClickToSnap,
  isDragging,
  onJumpToIndex,
  onItemClick,
}: CardProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setIsOpen(false)
    }
  }, [isActive])

  // Fix 6 — collapsed transform chain: scrollX → transforms (1 MotionValue) → derived values
  const transforms = useTransform(scrollX, (value) => {
    const pos = index - value
    const absPos = Math.abs(pos)
    const isCenter = absPos < 0.5

    let rotateY = 0
    if (pos < -0.5) rotateY = rotation
    if (pos > 0.5) rotateY = -rotation
    if (isCenter) rotateY = -pos * (rotation * 2)

    let x = 0
    if (pos < 0) {
      const stackIndex = Math.max(0, absPos - 1)
      x = -centerGap - stackIndex * stackSpacing
      if (absPos < 1) x = pos * centerGap
    } else {
      const stackIndex = Math.max(0, absPos - 1)
      x = centerGap + stackIndex * stackSpacing
      if (absPos < 1) x = pos * centerGap
    }

    let z = 0
    if (absPos > 0.5) {
      z = -200
    } else {
      z = Math.abs(pos) * -400
    }

    const zIndex = 1000 - Math.abs(pos) * 10
    const filterVal = Math.abs(pos) < 0.5 ? 1 : 0.5

    return { rotateY, x, z, zIndex, filterVal }
  })

  const rotateY = useTransform(transforms, (v) => v.rotateY)
  const x = useTransform(transforms, (v) => v.x)
  const z = useTransform(transforms, (v) => v.z)
  const zIndex = useTransform(transforms, (v) => v.zIndex)
  // Fix 1 — filterStyle extracted from inline style prop
  const filterStyle = useTransform(transforms, (v) => `brightness(${v.filterVal})`)

  const getCursorClass = () => {
    if (isDragging) return 'cursor-grabbing'
    if (isActive || enableClickToSnap) return 'cursor-pointer'
    return 'cursor-grab'
  }

  // Fix 2 — click logic moved inside card, no inline arrow in parent
  const handleCardClick = () => {
    if (!isActive) {
      if (enableClickToSnap) {
        onJumpToIndex(index)
      }
    } else {
      if (index === activeIndex) {
        onItemClick?.(item, index)
      }
      setIsOpen(!isOpen)
    }
  }

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 preserve-3d will-change-transform ${getCursorClass()}`}
      style={{
        width,
        height,
        marginTop: -height / 2,
        marginLeft: -width / 2,
        x,
        z,
        rotateY,
        zIndex,
        filter: filterStyle,
        pointerEvents: 'auto',
        // Fix 5 — prevent flickering during 3D transforms
        backfaceVisibility: 'hidden' as const,
      }}
    >
      <div
        className="relative w-full h-full rounded-xl shadow-2xl bg-black overflow-hidden select-none"
        onClick={handleCardClick}
      >
        <div className="absolute inset-0 rounded-xl border border-white/10 z-20 pointer-events-none" />
        {/* Fix 3 — Replace motion.img with div wrapper + next/image Image */}
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <motion.div
            className="absolute inset-0"
            animate={isOpen ? 'expanded' : 'collapsed'}
            variants={imageVariants}
            transition={disclosureTransition}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover select-none pointer-events-none"
              draggable={false}
              sizes={`${width}px`}
              priority={isActive}
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 dark:opacity-20 pointer-events-none z-10" />
        </div>

        {isActive && (
          <div onClick={(e) => e.stopPropagation()}>
            <Disclosure
              onOpenChange={setIsOpen}
              open={isOpen}
              className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-zinc-950/95 px-4 pt-2 dark:bg-white/95 border-t border-white/10 dark:border-black/5 z-30"
              variants={contentVariants}
              transition={disclosureTransition}
            >
              <DisclosureTrigger>
                <button
                  className="w-full pb-2 text-left text-[14px] font-medium text-white dark:text-zinc-900 cursor-pointer focus:outline-none"
                  type="button"
                >
                  {item.title}
                </button>
              </DisclosureTrigger>
              <DisclosureContent>
                <div className="flex flex-col pb-4 text-[13px] text-zinc-300 dark:text-zinc-700">
                  <p className="line-clamp-4 leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                </div>
              </DisclosureContent>
            </Disclosure>
          </div>
        )}
      </div>

      {enableReflection && !isOpen && (
        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{
            top: '100%',
            width: width,
            height: height * 0.35,
            marginTop: '2px',
          }}
        >
          {/* Fix 3 — Replace img with next/image Image for reflection */}
          <div
            className="relative w-full h-full opacity-40"
            style={{ transform: 'scaleY(-1)' }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover blur-[1px]"
              sizes={`${width}px`}
            />
            <div className="absolute inset-0 bg-linear-to-b from-background/90 to-transparent" />
          </div>
        </div>
      )}
    </motion.div>
  )
})
