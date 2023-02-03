// ./types/project.ts

export interface ProjectProps {
    title: string, 
    state?: "production" | "building",
    href: string, 
    text: string,
    createdAt: Date,
}