"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import type { BlogPost } from "@/lib/zenblog";
import { Input } from "@/components/ui/input";

interface BlogListProps {
    posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return (
            post.metadata.title.toLowerCase().includes(query) ||
            post.metadata.summary.toLowerCase().includes(query)
        );
    });

    return (
        <div className="flex flex-col space-y-8">
            <div className="relative">
                <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search posts..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchQuery(e.target.value)
                    }
                />
            </div>

            <div className="relative">
                <div className="divide-y">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))
                    ) : (
                        <div className="py-8 text-center text-muted-foreground">
                            No posts found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block w-full py-6 hover:bg-accent/30 active:bg-accent transition-colors"
        >
            <div className="flex flex-col md:flex-row gap-6 px-4">
                {post.metadata.image && (
                    <div className="shrink-0 w-full md:w-48 rounded-md overflow-hidden bg-accent">
                        <img
                            src={post.metadata.image}
                            alt={post.metadata.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 mt-0"
                        />
                    </div>
                )}
                <div className="flex flex-col grow justify-center space-y-2">
                    <div className="flex items-center justify-between gap-4">
                        <h3 className="font-semibold text-xl tracking-tight group-hover:text-primary transition-colors">
                            {post.metadata.title}
                        </h3>
                        <span className="shrink-0 text-sm text-muted-foreground font-mono uppercase">
                            {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 md:line-clamp-3">
                        {post.metadata.summary}
                    </p>
                    {post.metadata.tags && post.metadata.tags.length > 0 && (
                        <div className="flex gap-2 pt-2">
                            {post.metadata.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
