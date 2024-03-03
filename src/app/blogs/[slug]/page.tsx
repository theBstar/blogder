import { getAllBlogs, getPageData } from "@/app/actions";
import config from "@/config";

export async function generateStaticParams() {
    return getAllBlogs();
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
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    )
}
