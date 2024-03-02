"use client";

import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import { Button, Input, Modal } from "antd";
import { useEffect, useRef, useState } from "react";

const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};

type Props = {
  saveBlogToFile?: (fileDetails: any) => void;
  readOnly?: boolean;
  data?: any;
};

export default function Editor({
  saveBlogToFile,
  readOnly = false,
  data = {},
}: Props) {
  const editorRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");

  async function openSaveModal() {
    if (typeof editorRef.current?.save !== "function") return;
    const editorJsData = await editorRef?.current?.save();
    const defaultBlogTitle = editorJsData.blocks[0].data.text?.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    );
    setBlogTitle(defaultBlogTitle);
    setIsOpen(true);
  }

  async function saveBlog() {
    const editorJsData = await editorRef?.current?.save();
    if (typeof saveBlogToFile !== "function" || !blogTitle) return;
    saveBlogToFile({ filename: blogTitle, editorJsData });
    setIsOpen(false);
  }

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editor",
        tools: EDITOR_JS_TOOLS,
        readOnly,
        data,
      });
    }
  }, [readOnly, data]);

  return (
    <>
      <div style={{ position: "fixed", top: 16, right: 16 }}>
        {!readOnly && (
          <Button
            style={{ zIndex: 100 }}
            color="primary"
            onClick={openSaveModal}
          >
            Save
          </Button>
        )}
      </div>
      <div id="editor" style={{ width: "80%", margin: "0px auto" }} />
      <Modal
        open={isOpen}
        title="Save Blog"
        onCancel={() => setIsOpen(false)}
        onOk={saveBlog}
      >
        <Input
          type="text"
          placeholder="Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
      </Modal>
    </>
  );
}
