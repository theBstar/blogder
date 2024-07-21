import Editor from "@/components/Editor";
import { saveBlog } from "@/utils/actions";
import config from "../../config";


async function createNewBlog(fileDetails: any) {
    'use server'
    saveBlog({ absolutePath: config.blogsStorageKey, ...fileDetails })
}

export default function CreateBlog() {
    return (
        <main style={{ padding: 12 }}>
            <Editor save={createNewBlog} />
        </main>
    );
}
