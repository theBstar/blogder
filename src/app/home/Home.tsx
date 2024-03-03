import { Card, Col, Flex, Image, Row } from "antd";
import Link from "next/link";
import config from "../../../config";
import { getAllBlogs, getPageData } from "../actions";

export default async function Home() {
    const post = await getPageData(`${config.homeStorageKey}/home.json`);
    const allBlogs = await getAllBlogs();

    return (
        <Flex vertical gap={48} style={{ width: '100%' }} >
            <Flex gap={48} align="center" justify="center" style={{ width: '100%' }} wrap="wrap-reverse">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <Image src={config.heroPicture} width={300} height={300} alt={post.title} />
            </Flex>
            <Flex vertical gap={12}>
                <Flex align="center" justify="space-between">
                    <h2>Recent Blogs</h2>
                    <Link href="/blogs">
                        Read all
                    </Link>
                </Flex>
                <Row gutter={12}>
                    {allBlogs.slice(0, 3).map(blog => (
                        <Col key={blog.title} md={{ span: 12 }} lg={{ span: 8 }} sm={{ span: 24 }}>
                            <Link href={`/blogs/${blog.slug}`}>
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
        </Flex>
    )
}