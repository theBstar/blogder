import Editor from "@/components/Editor";
import { getBlogDataById, saveBlog } from "@/utils/actions";
import config from "../../../config";


async function saveBlogChanges(fileDetails: any) {
    'use server';
    saveBlog({ absolutePath: config.homeStorageKey, ...fileDetails, filename: 'home' })
}

export default async function EditBlog() {
    const data = await getBlogDataById(`${config.homeStorageKey}/home`);

    return (
        <Editor
            save={saveBlogChanges}
            data={data?.rawEditorData}
        />
    )
}