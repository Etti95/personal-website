import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Spotlight } from "@/components/spotlight";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Projects | Etiosa Richmore",
    description: "A showcase of my data analysis and engineering projects.",
};

export default function ProjectsPage() {
    const allProjects = getAllProjects();

    return (
        <main className="flex min-h-screen flex-col items-center px-6 py-24">
            <div className="w-full max-w-5xl space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                        <p className="text-muted-foreground mt-2 max-w-xl">
                            A collection of tools, apps, and experiments I&apos;ve built to solve real problems.
                        </p>
                    </div>
                    <Link href="/">
                        <Button variant="ghost">← Back to Home</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {allProjects.map((project) => (
                        <Spotlight key={project.metadata.slug} className="h-full rounded-xl">
                            <ProjectCard project={project.metadata} />
                        </Spotlight>
                    ))}
                </div>
            </div>
        </main>
    );
}
