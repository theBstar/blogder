'use client';

import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import EditorJS, { EditorConfig, ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import { useEffect, useRef } from "react";

type EditorTools = {
    [toolName: string]: ToolConstructable | ToolSettings;
};

export const EDITOR_JS_TOOLS: EditorTools = {
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
    image: {
        class: ImageTool,
        config: {
            endpoints: {
                byFile: '/api/upload',
            },
            field: 'file', // Make sure this matches the field name in the API route
            types: 'image/*'
        },
    } as unknown as EditorTools[string],
};


export default function useEditorJs(props: { editorConfig: EditorConfig }) {
    const editorRef = useRef<any>(null);
    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holder: "editor",
                tools: EDITOR_JS_TOOLS,
                autofocus: true,
                ...props.editorConfig,
            });
        }
    }, [props.editorConfig]);

    const ui = <div id="editor" style={{ width: "80%", margin: "0px auto" }} />;
    return { editorRef, ui };
}
