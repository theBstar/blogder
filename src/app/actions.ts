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
