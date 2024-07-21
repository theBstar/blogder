import config from "@/config";
import { getAllBlogs, getBlogDataById } from "@/utils/actions";

export async function generateStaticParams() {
    return getAllBlogs();
}

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props) {
    const post = await getBlogDataById(`${config.blogsStorageKey}/${params.id}`);
    return {
        title: post.title,
        description: post.description,
    }
}

export default async function BlogPost({ params: { id } }: Props) {
    const post = await getBlogDataById(`${config.blogsStorageKey}/${id}`);
    return (
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
    )
}
