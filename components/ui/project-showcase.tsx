"use client"

import Image from "next/image"
import Link from "next/link"
import type { MouseEvent } from "react"
import { useState } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { PROJECTS } from "@/app/data"

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 320, damping: 32, mass: 0.4 })
  const springY = useSpring(cursorY, { stiffness: 320, damping: 32, mass: 0.4 })
  const previewX = shouldReduceMotion ? cursorX : springX
  const previewY = shouldReduceMotion ? cursorY : springY

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    cursorX.set(event.clientX + 20)
    cursorY.set(event.clientY - 100)
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  const handleFocus = (index: number) => setHoveredIndex(index)
  const handleBlur = () => setHoveredIndex(null)

  return (
    <section onMouseMove={handleMouseMove} className="relative w-full py-16">
      <h1 className="mb-8 text-balance text-sm font-medium uppercase tracking-wide text-muted-foreground">Selected Work</h1>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden overflow-hidden rounded-xl shadow-2xl md:block"
        style={{ x: previewX, y: previewY, opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ opacity: { duration: shouldReduceMotion ? 0 : 0.25 }, scale: { duration: shouldReduceMotion ? 0 : 0.25 } }}
      >
        <div className="relative h-45 w-70 overflow-hidden rounded-xl bg-secondary">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="absolute inset-0 transition-[opacity,transform] duration-300 ease-out"
              style={{ opacity: hoveredIndex === index && isVisible ? 1 : 0, scale: hoveredIndex === index && isVisible ? 1 : 1.04 }}
            >
              <Image src={project.thumbnail} alt="" fill sizes="280px" className="object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
        </div>
      </motion.div>

      <div className="space-y-0">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="group"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative border-t border-border py-5 transition-colors duration-200">
              <div className={`pointer-events-none absolute inset-0 -mx-4 rounded-lg bg-secondary/50 px-4 transition-[opacity,transform] duration-200 ease-out ${hoveredIndex === index ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"}`} />
              <div className="relative flex items-start justify-between gap-4">
                <Link
                  href={`/work/${project.slug}`}
                  aria-label={`Read the full ${project.name} case study`}
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  className="min-w-0 flex-1 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <div className="inline-flex items-center gap-2">
                    <h2 className="text-lg font-medium tracking-tight text-foreground">
                      <span className="relative">
                        {project.name}
                        <span className={`absolute -bottom-0.5 left-0 h-px bg-foreground transition-[width] duration-300 ease-out ${hoveredIndex === index ? "w-full" : "w-0"}`} />
                      </span>
                    </h2>
                    <ArrowUpRight aria-hidden="true" className={`size-4 text-muted-foreground transition-[opacity,transform] duration-200 ease-out ${hoveredIndex === index ? "translate-x-0 translate-y-0 opacity-100" : "-translate-x-2 translate-y-2 opacity-0"}`} />
                  </div>
                  <p className={`mt-1 text-sm leading-relaxed transition-colors duration-200 ${hoveredIndex === index ? "text-foreground/70" : "text-muted-foreground"}`}>{project.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-foreground underline decoration-border underline-offset-4 transition-colors group-hover:decoration-foreground group-focus-within:decoration-foreground">
                    Read case study <ArrowRight aria-hidden="true" className="size-3.5" />
                  </span>
                </Link>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="relative z-10 mt-1 inline-flex min-h-11 shrink-0 touch-manipulation items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={`Visit ${project.name} website (opens in a new tab)`}>
                  Visit project <ArrowUpRight aria-hidden="true" className="size-3" />
                </a>
              </div>
            </div>
          </article>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
