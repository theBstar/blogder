import { OutputData } from "@editorjs/editorjs";

export type BlogStatus = "draft" | "published";

export type Blog = {
  id: string;
  title: string;
  description: string;
  content: string;
  rawEditorData?: OutputData;
};

export type SavedBlogData = {
  status: BlogStatus;
  data: OutputData;
};
