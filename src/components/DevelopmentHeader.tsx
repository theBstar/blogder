'use client';

import config from "@/config";
import { Button, Flex } from "antd";
import { usePathname, useRouter } from "next/navigation";

function Header() {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <Flex flex={1} style={{ padding: 16 }} justify="space-between">
            <Flex gap={8}>
                <Button onClick={() => {
                    if (pathname === '/') {
                        router.push('/dev/edit-blog');
                        return;
                    }
                    router.push('/');
                }}>
                    {pathname === '/' ? 'Edit' : 'Home'}
                </Button>
                <Button onClick={() => router.push('/blogs')}>Blogs</Button>
            </Flex>
            {pathname.includes('create') || pathname.includes('edit') ? null : (
                <Button onClick={() => router.push('/dev/create-blog')}>New blog</Button>
            )}
        </Flex>
    )
}

export default function DevelopmentHeader() {
    if (config.isProduction) return null;
    return <Header />
}