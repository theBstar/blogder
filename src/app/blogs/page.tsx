import { Card, Flex } from 'antd';
import Link from 'next/link';
import { getAllBlogs } from '../actions';



export default async function Blogs() {
    const data = await getAllBlogs();
    return (
        <>
            <h1>Blogs</h1>
            <p>
                Read all blogs here.
            </p>
            <Flex vertical gap={16}>
                {data.map(blog => (
                    <Card hoverable key={blog.slug}>
                        <Link href={`/blogs/${blog.slug}`}>
                            <Flex vertical>
                                {blog.title}
                                <p style={{ color: '#000', opacity: '.7' }}>{blog.description}</p>
                            </Flex>

                        </Link>

                    </Card>
                ))}
            </Flex>

        </>
    )
}
