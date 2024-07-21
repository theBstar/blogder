import RecentBlogs from '@/components/RecentBlogs';
import config from '@/config';
import { getBlogDataById } from "@/utils/actions";
import { Flex, Image } from "antd";

export default async function Home() {
  const post = await getBlogDataById(`${config.homeStorageKey}/home`);

  return (
    <main style={{ padding: 12 }}>
      <Flex vertical gap={48} style={{ width: '100%' }} >
        <Flex gap={48} align="center" justify="center" style={{ width: '100%' }} wrap="wrap-reverse">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <Image src={config.heroPicture} width={300} height={300} alt={post.title} />
        </Flex>
        <RecentBlogs />
      </Flex>
    </main>
  )
}