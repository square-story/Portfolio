"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { PROJECTS } from "@/app/data"

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full py-16">
      <h1 className="mb-8 text-sm font-medium uppercase tracking-wide text-muted-foreground">Selected Work</h1>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-50 hidden overflow-hidden rounded-xl shadow-2xl md:block"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative h-45 w-70 overflow-hidden rounded-xl bg-secondary">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="absolute inset-0 transition-all duration-500 ease-out" style={{ opacity: hoveredIndex === index ? 1 : 0, scale: hoveredIndex === index ? 1 : 1.1, filter: hoveredIndex === index ? "none" : "blur(10px)" }}>
              <Image src={project.thumbnail} alt="" fill sizes="280px" className="object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
        </div>
      </div>

      <div className="space-y-0">
        {PROJECTS.map((project, index) => (
          <article key={project.id} className="group" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
            <div className="relative border-t border-border py-5 transition-all duration-300 ease-out">
              <div className={`absolute inset-0 -mx-4 rounded-lg bg-secondary/50 px-4 transition-all duration-300 ease-out ${hoveredIndex === index ? "scale-100 opacity-100" : "scale-95 opacity-0"}`} />
              <div className="relative flex items-start justify-between gap-4">
                <Link href={`/work/${project.slug}`} aria-label={`Read the full ${project.name} case study`} className="min-w-0 flex-1 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4">
                  <div className="inline-flex items-center gap-2">
                    <h2 className="text-lg font-medium tracking-tight text-foreground">
                      <span className="relative">{project.name}<span className={`absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ease-out ${hoveredIndex === index ? "w-full" : "w-0"}`} /></span>
                    </h2>
                    <ArrowUpRight aria-hidden="true" className={`size-4 text-muted-foreground transition-all duration-300 ease-out ${hoveredIndex === index ? "translate-x-0 translate-y-0 opacity-100" : "-translate-x-2 translate-y-2 opacity-0"}`} />
                  </div>
                  <p className={`mt-1 text-sm leading-relaxed transition-colors duration-300 ease-out ${hoveredIndex === index ? "text-foreground/70" : "text-muted-foreground"}`}>{project.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-foreground underline decoration-border underline-offset-4 transition-colors group-hover:decoration-foreground">
                    Read case study <ArrowRight aria-hidden="true" className="size-3.5" />
                  </span>
                </Link>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="relative z-10 mt-1 inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={`Visit ${project.name} website (opens in a new tab)`}>
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
