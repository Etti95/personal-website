import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Spotlight } from "@/components/spotlight";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="flex w-full max-w-5xl flex-col items-start justify-center px-6 py-24 md:py-32">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Turning complex data <br className="hidden sm:inline" />
            into <span className="text-zinc-500 dark:text-zinc-400">intuitive products.</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            I’m Etiosa Richmore, a Data Analyst and Prompt Engineer based in Sweden.
            I pride myself on changing complex problems to clear solutions.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/projects">
              <Button size="lg">View Projects</Button>
            </Link>
            <Link href="mailto:etiosa.richmore@gmail.com">
              <Button variant="outline" size="lg">Contact Me</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="w-full max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Selected Work</h2>
          <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-primary">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Spotlight key={project.metadata.slug} className="h-full rounded-xl">
              <ProjectCard project={project.metadata} />
            </Spotlight>
          ))}
        </div>
      </section>
    </main>
  );
}
