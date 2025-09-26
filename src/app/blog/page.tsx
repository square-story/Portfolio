import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-8">
          <h1 className="font-bold text-2xl sm:text-3xl tracking-tighter">Blog</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Notes on building software, shipped experiments, and lessons learned.
          </p>
        </div>
      </BlurFade>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link
                className="group block h-full border rounded-xl p-4 bg-background/70 hover:bg-accent/40 transition-colors"
                href={`/blog/${post.slug}`}
              >
                <div className="flex flex-col h-full">
                  <p className="font-semibold tracking-tight group-hover:underline">
                    {post.metadata.title}
                  </p>
                  <p className="text-[11px] mt-1 text-muted-foreground">
                    {post.metadata.publishedAt}
                  </p>
                  {post.metadata.summary && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                      {post.metadata.summary}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-2 text-xs text-foreground/80 group-hover:text-foreground">
                    Read more
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
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </BlurFade>
          ))}
      </div>
    </section>
  );
}
