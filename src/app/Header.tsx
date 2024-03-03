'use client';

import { Button, Flex } from "antd";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <Flex flex={1} style={{ padding: 16 }} justify="space-between">
            <Flex gap={8}>
                <Button onClick={() => {
                    if (pathname === '/') {
                        router.push('/edit');
                        return;
                    }
                    router.push('/');
                }}>
                    {pathname === '/' ? 'Edit' : 'Home'}
                </Button>
                <Button onClick={() => router.push('/blogs')}>Blogs</Button>
            </Flex>
            {pathname.endsWith('new') || pathname.endsWith('edit') ? null : (
                <Button onClick={() => router.push('/blogs/new')}>New blog</Button>
            )}
        </Flex>
    )
}