"use client";

import { Button, Input, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import useEditorJs from "../core/EditorJs/EditorJs";

type Props = {
  save?: (fileDetails: any) => void;
  readOnly?: boolean;
  data?: any;
};

export default function Editor({
  save,
  readOnly = false,
  data = {},
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const { editorRef, ui: editorUI } = useEditorJs({ editorConfig: { readOnly, data } });


  const openSaveModal = useCallback(async () => {
    if (typeof editorRef.current?.save !== "function") return;
    const editorJsData = await editorRef?.current?.save();
    const defaultBlogTitle = editorJsData.blocks[0].data.text?.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    );
    setBlogTitle(defaultBlogTitle);
    setIsOpen(true);
  }, [editorRef]);

  async function saveBlog() {
    const editorJsData = await editorRef?.current?.save();
    if (typeof save !== "function" || !blogTitle) return;
    save({ filename: blogTitle, editorJsData });
    setIsOpen(false);
  }

  // save blog on command + s
  useEffect(() => {
    const handleSave = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        openSaveModal();
      }
    };
    window.addEventListener("keydown", handleSave);
    return () => window.removeEventListener("keydown", handleSave);
  }, [openSaveModal]);


  return (
    <>
      <div style={{ position: "fixed", top: 16, right: 16 }}>
        {!readOnly && (
          <Button
            style={{ zIndex: 100 }}
            type="primary"
            onClick={openSaveModal}
          >
            Save
          </Button>
        )}
      </div>
      {editorUI}
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
