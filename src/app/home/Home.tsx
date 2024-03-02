import config from "@/config";
import { getPageData } from "../actions";

export default async function Home() {
    const post = await getPageData(`${config.homeStorageKey}/home.json`);

    return (
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
    )
}