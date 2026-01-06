import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Globe } from "lucide-react";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    return {
        title: `${project.metadata.title} | Etiosa Richmore`,
        description: project.metadata.summary,
    };
}

export async function generateStaticParams() {
    const slugs = getProjectSlugs();
    return slugs.map((file) => ({
        slug: file.replace(/\.mdx$/, ""),
    }));
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const { metadata, content } = getProjectBySlug(slug);

    return (
        <main className="min-h-screen py-24 px-6">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <Link href="/projects">
                        <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors group">
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Projects
                        </Button>
                    </Link>
                </div>

                <div className="mb-12 space-y-6">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            {metadata.title}
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            {metadata.summary}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {metadata.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>

                    <div className="flex gap-4 border-t border-b border-zinc-100 py-6 dark:border-zinc-800">
                        {metadata.demoUrl && (
                            <a href={metadata.demoUrl} target="_blank" rel="noopener noreferrer">
                                <Button>
                                    <Globe className="mr-2 h-4 w-4" /> Live Demo
                                </Button>
                            </a>
                        )}
                        {metadata.repoUrl && (
                            <a href={metadata.repoUrl} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline">
                                    <Github className="mr-2 h-4 w-4" /> View Code
                                </Button>
                            </a>
                        )}
                    </div>

                    {metadata.metric && (
                        <div className="rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900/50">
                            <p className="font-mono text-sm uppercase text-muted-foreground">Impact</p>
                            <p className="text-lg font-semibold text-foreground">{metadata.metric}</p>
                        </div>
                    )}
                </div>


                <article className="prose prose-zinc dark:prose-invert max-w-none">
                    <MDXRemote source={content} />
                </article>
            </div>
        </main>
    );
}
