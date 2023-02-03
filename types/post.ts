// ./types/post.ts

export interface PostProps {
    title: string;
    text: string;
    date: string;
    image?: {
        src: string,
        alt: string,
    }
}

export interface CommitProps {
    guest: string,
    message: string,
    createAt?: string,
}