import Editor from "@/app/Editor";
import { saveBlogToFile } from "@/app/actions";
import config from "@/config";


async function saveNewBlog(fileDetails: any) {
    saveBlogToFile({ absolutePath: config.blogsStorageKey, ...fileDetails })
}

export default function NewBlog() {
    return (
        <main style={{ padding: 12 }}>
            <Editor saveBlogToFile={saveNewBlog} />
        </main>
    );
}
