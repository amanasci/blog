import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export type Post = {
    slug: string;
    meta: {
        title: string;
        date: string;
        tags?: string[];
        description?: string;
        [key: string]: any;
    };
    content: any; // ReactElement
};

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { content, data } = matter(fileContents);

        // We don't compile here if we want to use <MDXRemote> in the component, 
        // but for App Router it's often easier to compile here or return raw source.
        // Let's return raw source + data for now, or use compileMDX if we want RSC.
        // Using compileMDX from next-mdx-remote/rsc is great for RSC.

        let serializedMeta = { ...data };
        if (serializedMeta.date instanceof Date) {
            serializedMeta.date = serializedMeta.date.toISOString();
        }

        return {
            slug: realSlug,
            meta: serializedMeta as any,
            content: content,
        };
    } catch (e) {
        return undefined;
    }
}

export function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            let serializedMeta = { ...data };
            if (serializedMeta.date instanceof Date) {
                serializedMeta.date = serializedMeta.date.toISOString();
            }

            return {
                slug,
                meta: serializedMeta,
            };
        });

    // Sort posts by date
    return allPosts.sort((a, b) => {
        if (a.meta.date < b.meta.date) {
            return 1;
        } else {
            return -1;
        }
    });
}
