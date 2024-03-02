import { getPageData } from "@/app/actions";
import config from "@/config";
import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
    const blogDir = path.join(process.cwd(), config.blogsStorageKey);
    const filenames = fs.readdirSync(blogDir);
    return filenames.map((slug) => ({
        slug: slug.replace('.json', '')
    }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
    const post = await getPageData(`${config.blogsStorageKey}/${params.slug}.json`);
    return {
        title: post.title,
    }
}

export default async function BlogPost({ params }: Props) {
    const post = await getPageData(`${config.blogsStorageKey}/${params.slug}.json`);
    return (
        <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    )
}
