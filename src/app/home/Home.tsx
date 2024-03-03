import config from "@/config";
import { Flex, Image } from "antd";
import { getPageData } from "../actions";

export default async function Home() {
    const post = await getPageData(`${config.homeStorageKey}/home.json`);

    return (
        <Flex gap={48} align="center" justify="center" style={{ width: '100%' }}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <Image src={"/vercel.svg"} alt={post.title} />
        </Flex>
    )
}