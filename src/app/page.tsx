import { GithubGraph } from "@/components/github";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Markdown from "react-markdown";
import Image from "next/image";
import { Suspense } from "react";
import Magnet from "@/components/Magnet";
import { ConfettiButton } from "@/components/magicui/confetti";
import { MinimalProjectList } from "@/components/MinimalProjectCard";

const BLUR_FADE_DELAY = 0.04;

async function GetRepoCount({ username }: { username: string }) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  return data.public_repos;
}

function RepoLink({ username }: { username: string }) {
  return (
    <BlurFade delay={BLUR_FADE_DELAY * 13}>
      <div className="flex justify-center mt-8">
        <Link
          href={`https://github.com/${username}?tab=repositories`}
          className="group inline-flex items-center gap-3 px-6 py-3 text-base font-medium text-muted-foreground hover:text-foreground transition-all rounded-lg border border-border/50 hover:border-border hover:bg-accent/50"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Suspense fallback="View all repositories">
            <span className="flex items-center gap-2">
              View <GetRepoCount username="square-story" /> Projects
            </span>
          </Suspense>
          <FaGithub className="size-5 transition-transform group-hover:scale-110 group-hover:rotate-12 animate-[pulse_2s_ease-in-out_infinite]" />
        </Link>
      </div>
    </BlurFade>
  );
}

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 px-2 sm:px-4 md:px-8">
      <section id="hero">
        <div className="mx-auto w-full max-w-5xl space-y-8">
          <div className="gap-2 flex flex-col-reverse sm:flex-row justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">

              <div className="flex items-center gap-2 flex-wrap">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-6xl/none"
                  yOffset={8}
                  text={`Hi, I'm ${DATA.name.split(" ")[0]} `}
                />
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <Image
                    src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif"
                    width={60}
                    height={60}
                    alt="Wave"
                    unoptimized
                    className="w-[32px] sm:w-[40px] md:w-[60px] xl:w-[70px]"
                  />
                </BlurFade>
              </div>
              <BlurFadeText
                className="max-w-full md:max-w-[600px] md:text-xl text-base"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <div className="flex flex-wrap items-center gap-2">
                <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                  <Magnet padding={100} disabled={false} magnetStrength={100}>
                    <ConfettiButton
                      className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 gap-2 cursor-pointer hover:bg-emerald-100 hover:text-emerald-800 hover:border-emerald-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 dark:hover:border-emerald-800"
                    >
                      <span
                        className="size-2 rounded-full bg-emerald-500 animate-pulse"
                        aria-hidden="true"
                      ></span>
                      Open to Work
                    </ConfettiButton>
                  </Magnet>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 2}>
                  <Magnet padding={100} disabled={false} magnetStrength={100}>
                    <ConfettiButton
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-300 dark:border-blue-800 gap-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 dark:hover:border-blue-800"
                    >
                      <Link
                        href="/MOHAMMED_SADIK_MERN_STACK.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <span
                          className="size-2 rounded-full bg-blue-500 animate-pulse"
                          aria-hidden="true"
                        ></span>
                        Download Resume
                      </Link>
                    </ConfettiButton>
                  </Magnet>
                </BlurFade>
              </div>
            </div>

            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="relative flex justify-center sm:block mb-4 sm:mb-0 ">
                <Avatar className="size-24 sm:size-28 bg-background relative hidden sm:block">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
                <span className="absolute hidden sm:-right-2 sm:bottom-0 sm:block">
                  <span className="sr-only">Verified</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="drop-shadow-md"
                  >
                    <path
                      className="fill-background"
                      d="M3.046 8.277A4.402 4.402 0 0 1 8.303 3.03a4.4 4.4 0 0 1 7.411 0 4.397 4.397 0 0 1 5.19 3.068c.207.713.23 1.466.067 2.19a4.4 4.4 0 0 1 0 7.415 4.403 4.403 0 0 1-3.06 5.187 4.398 4.398 0 0 1-2.186.072 4.398 4.398 0 0 1-7.422 0 4.398 4.398 0 0 1-5.257-5.248 4.4 4.4 0 0 1 0-7.437Z"
                    />
                    <path
                      className="fill-primary"
                      d="M4.674 8.954a3.602 3.602 0 0 1 4.301-4.293 3.6 3.6 0 0 1 6.064 0 3.598 3.598 0 0 1 4.3 4.302 3.6 3.6 0 0 1 0 6.067 3.6 3.6 0 0 1-4.29 4.302 3.6 3.6 0 0 1-6.074 0 3.598 3.598 0 0 1-4.3-4.293 3.6 3.6 0 0 1 0-6.085Z"
                    />
                    <path
                      className="fill-background"
                      d="M15.707 9.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
                    />
                  </svg>
                </span>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-lg sm:text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm sm:text-base text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-lg sm:text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-lg sm:text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-lg sm:text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1 cursor-pointer">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill.name} className="flex items-center gap-2 text-xs sm:text-sm">
                  {skill.icon}
                  {skill.name}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="github-activity">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <h2 className="text-lg sm:text-xl font-bold">
              <Link
                href="https://github.com/square-story"
                className="flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Contributions <FaGithub className="size-5" />
              </Link>
            </h2>
            <div className="overflow-x-auto">
              <GithubGraph
                username="square-story"
                blockMargin={5}
              />
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center sm:items-start sm:text-left">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <MinimalProjectList />
            <div className="flex justify-center mt-8">
              <RepoLink username="square-story" />
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-2 sm:px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-foreground/90 text-background px-4 py-2 text-sm font-medium shadow-sm transition-all hover:scale-105 hover:bg-foreground group cursor-pointer">
                <Link
                  href={`https://twitter.com/messages/compose?recipient_id=${DATA.contact.social.X.username}`}
                  className="flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 fill-current transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
              </div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-full sm:max-w-[600px] text-muted-foreground text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed leading-relaxed">
                Want to chat? Just shoot me a dm on{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="group relative inline-flex items-center gap-1 text-foreground hover:text-foreground/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                  <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
                {" "}and I&apos;ll respond whenever I can.{" "}
                <span className="text-foreground/80 italic">I will ignore all soliciting.</span>
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
