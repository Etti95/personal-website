import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

export interface ProjectMetadata {
    slug: string;
    title: string;
    summary: string;
    featured: boolean;
    tags: string[];
    startDate: string;
    endDate?: string;
    repoUrl?: string;
    demoUrl?: string;
    metric?: string;
}

export function getProjectSlugs() {
    return fs.readdirSync(projectsDirectory);
}

export function getProjectBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(projectsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const metadata = {
        slug: realSlug,
        ...(data as Omit<ProjectMetadata, "slug">),
    } as ProjectMetadata;

    return {
        metadata,
        content,
    };
}

export function getAllProjects() {
    const slugs = getProjectSlugs();
    const projects = slugs.map((slug) => getProjectBySlug(slug));
    // Sort projects by date descending (assuming startDate exists)
    return projects.sort((project1, project2) =>
        project1.metadata.startDate > project2.metadata.startDate ? -1 : 1
    );
}

export function getFeaturedProjects() {
    const allProjects = getAllProjects();
    return allProjects.filter((project) => project.metadata.featured);
}
