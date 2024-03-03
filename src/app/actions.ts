import config from "@/config";
import { OutputData } from "@editorjs/editorjs";
import edjsParser from "editorjs-parser";
import fs from "fs";
import path from "path";

export async function saveBlogToFile({
  filename,
  editorJsData,
  absolutePath,
}: {
  filename: string;
  editorJsData: any;
  absolutePath: string;
}) {
  try {
    const fs = require("fs");
    const path = require("path");
    const blogPath = path.join(process.cwd(), absolutePath, filename + ".json");
    fs.writeFileSync(blogPath, JSON.stringify(editorJsData, null, 2));
    return blogPath;
  } catch (e) {}
}

// export async function getAllBlogs() {
//   const blogDir = path.join(process.cwd(), config.blogsStorageKey);
//   const filenames = fs.readdirSync(blogDir);
//   return filenames.map((slug) => ({
//     slug: slug.replace(".json", ""),
//   }));
// }

export async function getAllBlogs() {
  const files = fs.readdirSync(
    path.join(process.cwd(), config.blogsStorageKey)
  );
  const blogs = files.map((file) => {
    const slug = file.replace(".json", "");
    const content = fs.readFileSync(
      path.join(process.cwd(), config.blogsStorageKey, file),
      "utf8"
    );
    const data = JSON.parse(content);
    return {
      slug,
      title: data?.blocks[0]?.data?.text,
      description: data?.blocks[1]?.data?.text?.replace(/&nbsp;/g, ""),
    };
  });

  return blogs;
}

export async function getPageData(page: string) {
  const filePath = path.join(process.cwd(), page);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data: OutputData = !fileContent
    ? {
        blocks: [],
        time: 0,
        version: 0,
      }
    : JSON.parse(fileContent);

  const parser = new edjsParser();
  const html = parser.parse(data);

  return {
    title: "Undtitled",
    data: data,
    content: html,
  };
}
