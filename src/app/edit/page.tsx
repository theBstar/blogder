import Editor from "@/app/Editor";
import { getPageData, saveBlogToFile } from "@/app/actions";
import config from "../../../config";


async function saveHomePage(fileDetails: any) {
    'use server';
    saveBlogToFile({ absolutePath: config.homeStorageKey, ...fileDetails, filename: 'home' })
}

export default async function Edit() {
    const data = await getPageData(`${config.homeStorageKey}/home.json`);

    return (
        <Editor
            saveBlogToFile={saveHomePage}
            data={data?.data}
        />
    )
}