import { Card, Flex } from 'antd';
import Link from 'next/link';
import { getAllBlogs } from '../../utils/actions';

export const metadata = {
    title: 'Blogs',
    description: 'Read all blogs here.',
};


export default async function Blogs() {
    const data = await getAllBlogs();
    return (
        <Flex vertical gap={48}>
            <Flex vertical gap={12}>
                <h1 style={{ marginBottom: 0 }}>Blogs</h1>
                <p style={{ margin: 0 }}>
                    Read all blogs here.
                </p>
            </Flex>
            <Flex vertical gap={16}>
                {data.map(blog => (
                    <Card hoverable key={blog.id}>
                        <Link href={`/blogs/${blog.id}`}>
                            <Flex vertical>
                                {blog.title}
                                <p style={{ color: '#000', opacity: '.7' }}>{blog.description}</p>
                            </Flex>
                        </Link>

                    </Card>
                ))}
            </Flex>

        </Flex>
    )
}
