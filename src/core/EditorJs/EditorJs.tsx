import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import EditorJS, { EditorConfig } from "@editorjs/editorjs";
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
import { useEffect, useRef } from "react";

export const EDITOR_JS_TOOLS = {
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
