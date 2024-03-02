import fs from 'fs';
import Link from 'next/link';
import path from 'path';

async function getData() {
    const files = fs.readdirSync(path.join(process.cwd(), 'src/data/blogs'));
    const blogs = files.map(file => {
        const slug = file.replace('.json', '');
        const content = fs.readFileSync(path.join(process.cwd(), 'src/data/blogs', file), 'utf8');
        const data = JSON.parse(content);
        return {
            slug,
            ...data
        }
    });

    return blogs;

}

export default async function Blogs() {
    const data = await getData();
    return (
        <main>
            <h1>Blogs</h1>
            <Link href="/blogs/new">New Blog</Link>
            <ul>
                {data.map(blog => (
                    <li key={blog.slug}>
                        <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>

        </main>
    )
}
