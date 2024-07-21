import { getAllBlogs } from "@/utils/actions";
import { Card, Col, Flex, Row } from "antd";
import Link from "next/link";


export default async function RecentBlogs() {
    const allBlogs = await getAllBlogs();
    const recentBlogs = allBlogs.slice(0, 4);
    return (
        <Flex vertical gap={12}>
            <Flex align="center" justify="space-between">
                <h2>Recent Blogs</h2>
                <Link href="/blogs">
                    Read all
                </Link>
            </Flex>
            <Row gutter={12}>
                {recentBlogs.map(blog => (
                    <Col key={blog.title} md={{ span: 12 }} lg={{ span: 8 }} sm={{ span: 24 }}>
                        <Link href={`/blogs/${blog.id}`}>
                            <Card hoverable>
                                <div style={{ fontSize: '1.08rem', opacity: .8, fontWeight: 'bold' }}>
                                    {blog.title}
                                </div>
                                <p style={{ opacity: .8 }}>{blog.description.slice(0, 40) || 'Read more ...'}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Flex>
    )
}