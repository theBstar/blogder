import fs from "fs";
import path from "path";
import config from "../config";
import { getBlogContentHTMLFromSavedData } from "./parser";
import { Blog, SavedBlogData } from "./types";

export async function getAllBlogs(): Promise<Blog[]> {
  const files = fs.readdirSync(
    path.join(process.cwd(), config.blogsStorageKey)
  );
  const blogs = files.map((file) => {
    const slug = file.replace(".json", "");
    const content = fs.readFileSync(
      path.join(process.cwd(), config.blogsStorageKey, file),
      "utf8"
    );
    const savedBlogData: SavedBlogData = JSON.parse(content);
    const data = savedBlogData.data;
    let description = data?.blocks[1]?.data?.text?.replace(/&nbsp;/g, "") || "";
    if (description.lenght > 60) {
      description = description.slice(0, 60) + "...";
    }
    return {
      id: slug,
      title: data?.blocks[0]?.data?.text,
      description: description,
      content: getBlogContentHTMLFromSavedData(data),
    };
  });

  return blogs;
}

export async function getBlogDataById(id: string): Promise<Blog> {
  const filePath = path.join(process.cwd(), `${id}.json`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  if (!fileContent) {
    return {
      id,
      title: "Not Found",
      description: "",
      content: "",
    };
  }

  const savedBlogData: SavedBlogData = JSON.parse(fileContent);
  const data = savedBlogData.data;

  return {
    id,
    title: data?.blocks[0]?.data?.text || "Undtitled",
    rawEditorData: data,
    description: data?.blocks[1]?.data?.text?.replace(/&nbsp;/g, "") || "",
    content: getBlogContentHTMLFromSavedData(data),
  };
}
