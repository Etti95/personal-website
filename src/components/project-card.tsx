import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ProjectMetadata } from "@/lib/projects";
import { ArrowUpRight, Github } from "lucide-react";

interface ProjectCardProps {
    project: ProjectMetadata;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className="group relative flex flex-col justify-between overflow-hidden border-zinc-200 bg-white transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                    {project.metric && (
                        <Badge variant="secondary" className="font-mono text-xs">
                            {project.metric}
                        </Badge>
                    )}
                </div>
                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                    {project.summary}
                </p>
            </CardHeader>
            <CardContent className="grow">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex gap-4 border-t border-zinc-100 p-4 dark:border-zinc-800">
                <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center text-sm font-medium hover:underline"
                >
                    Case Study <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
                {project.demoUrl && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Live Demo
                    </a>
                )}
            </CardFooter>
        </Card>
    );
}
