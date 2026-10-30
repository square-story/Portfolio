import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { CASE_STUDIES, PROJECTS } from '@/app/data'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS.find((item) => item.slug === slug)
  const story = CASE_STUDIES[slug]
  if (!project || !story) return { title: 'Case study not found' }
  const title = `${project.name} case study`
  return {
    title,
    description: story.overview,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title, description: story.overview, url: `/work/${slug}`, images: [project.thumbnail] },
    twitter: { card: 'summary_large_image', title, description: story.overview, images: [project.thumbnail] },
  }
}

const sectionLinks = [
  ['problem', 'The challenge'],
  ['flow', 'How it works'],
  ['approach', 'The approach'],
  ['build', 'Behind the build'],
  ['outcome', 'Takeaway'],
] as const

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const projectIndex = PROJECTS.findIndex((item) => item.slug === slug)
  const project = PROJECTS[projectIndex]
  const story = CASE_STUDIES[slug]
  if (!project || !story) notFound()
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length]
  const nextStory = CASE_STUDIES[nextProject.slug]

  return (
    <article className="mx-auto w-full max-w-2xl">
      <Link href="/work" className="mb-7 inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 dark:hover:text-white">
        <ArrowLeft aria-hidden="true" className="size-3.5" /> All case studies
      </Link>

      <header className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{story.eyebrow}</p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-950 dark:text-white sm:text-4xl">{project.name}</h1>
        <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{story.overview}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
          <span><span className="text-zinc-400">Role</span> · {story.role}</span>
          <span><span className="text-zinc-400">Type</span> · {project.category}</span>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-zinc-900 hover:underline dark:text-zinc-100">Visit project <ArrowUpRight aria-hidden="true" className="size-3" /></a>
          {project.repoLink && <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-zinc-900 hover:underline dark:hover:text-white">Source <ArrowUpRight aria-hidden="true" className="size-3" /></a>}
        </div>
      </header>

      <figure className="relative mt-7 aspect-[1.7] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
        <Image src={project.thumbnail} alt={`${project.name} project preview`} fill priority sizes="(max-width: 672px) 100vw, 672px" className="object-cover" />
      </figure>

      <div className="mt-9 grid gap-10 sm:grid-cols-[minmax(0,1fr)_150px]">
        <div className="min-w-0 space-y-10">
          <section id="problem" className="scroll-mt-8 space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">01 · The challenge</p>
            <h2 className="text-xl font-medium tracking-tight text-zinc-950 dark:text-white">A problem worth smoothing out</h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{story.problem}</p>
          </section>

          <section id="flow" className="scroll-mt-8 space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">02 · The experience</p>
            <h2 className="text-xl font-medium tracking-tight text-zinc-950 dark:text-white">How it works</h2>
            <ol className="space-y-2">
              {story.flow.map((step, index) => (
                <li key={step.title} className="flex gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">{String(index + 1).padStart(2, '0')}</span>
                  <div className="space-y-0.5"><h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{step.title}</h3><p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{step.description}</p></div>
                </li>
              ))}
            </ol>
          </section>

          {story.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-8 space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">{String(index + 3).padStart(2, '0')} · {section.title}</p>
              <h2 className="text-xl font-medium tracking-tight text-zinc-950 dark:text-white">{section.summary}</h2>
              <ul className="space-y-2">
                {section.details.map((detail) => <li key={detail} className="flex gap-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-zinc-400" />{detail}</li>)}
              </ul>
            </section>
          ))}

          <section id="outcome" className="scroll-mt-8 space-y-3 rounded-2xl bg-zinc-100 p-5 dark:bg-zinc-900">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">05 · Takeaway</p>
            <h2 className="text-xl font-medium tracking-tight text-zinc-950 dark:text-white">A more connected experience</h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{story.outcome}</p>
          </section>

          <section aria-label="Project links" className="flex flex-wrap gap-3">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">Visit {project.name} <ArrowUpRight aria-hidden="true" className="size-3.5" /></a>
            {project.repoLink && <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900">View source <ArrowUpRight aria-hidden="true" className="size-3.5" /></a>}
          </section>
        </div>

        <aside className="hidden sm:block">
          <nav aria-label="On this page" className="sticky top-8 space-y-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-400">On this page</p>
            {sectionLinks.map(([id, label]) => <a key={id} href={`#${id}`} className="block text-xs text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:text-white">{label}</a>)}
          </nav>
        </aside>
      </div>

      <Link href={`/work/${nextProject.slug}`} className="group mt-12 flex items-center justify-between gap-4 border-t border-zinc-200 py-5 dark:border-zinc-800">
        <span><span className="block text-[10px] uppercase tracking-[0.15em] text-zinc-500">Next case study</span><span className="mt-1 block text-sm font-medium text-zinc-950 dark:text-white">{nextProject.name} <span className="font-normal text-zinc-500">· {nextStory.eyebrow}</span></span></span>
        <ArrowRight aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  )
}
