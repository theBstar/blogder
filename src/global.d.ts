declare module "@editorjs/code" {}
declare module "@editorjs/delimiter" {}
declare module "@editorjs/embed" {}
declare module "@editorjs/header" {}
declare module "@editorjs/inline-code" {}
declare module "@editorjs/link" {}
declare module "@editorjs/list" {}
declare module "@editorjs/marker" {}
declare module "@editorjs/quote" {}
declare module "@editorjs/raw" {}
declare module "@editorjs/simple-image" {}
declare module "@editorjs/table" {}
declare module "@editorjs/warning" {}
declare module "@editorjs/paragrah" {}
declare module "editorjs-parser" {
  export default class EditorJSParser {
    parse(data: any): string;
  }
}
