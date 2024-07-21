import edjsHTML from "editorjs-html";

interface Block {
  type: string;
  data: any;
}

interface ImageData {
  file: { url: string };
  caption: string;
}

interface ListData {
  style: "ordered" | "unordered";
  items: string[];
}

interface QuoteData {
  text: string;
  caption: string;
}

interface CodeData {
  code: string;
}

interface TableData {
  content: string[][];
}

interface WarningData {
  title: string;
  message: string;
}

// Define a type for custom parser functions
type CustomParser = (data: any) => string;

// Custom parsers for additional block types
const customParsers: Record<string, CustomParser> = {
  image: (block: Block) => {
    const data = block.data as ImageData;
    return `<figure class="cdx-block image-block">
              <img src="${data.file.url}" alt="${data.caption}" />
              <figcaption>${data.caption}</figcaption>
            </figure>`;
  },

  list(block: Block): string {
    const data = block.data as ListData;
    const listItems = data.items
      .map((item: string) => `<li>${item}</li>`)
      .join("");
    return `<${
      data.style === "ordered" ? "ol" : "ul"
    } class="cdx-block list-block ${data.style}-list-block">
              ${listItems}
            </${data.style === "ordered" ? "ol" : "ul"}>`;
  },

  table: (block: Block) => {
    const data = block.data as TableData;
    const rows = data.content
      .map((row) => {
        const cells = row.map((cell) => `<td>${cell}</td>`).join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");
    return `<table class="cdx-block table-block"><tbody>${rows}</tbody></table>`;
  },

  quote: (block: Block) => {
    const data = block.data as QuoteData;
    return `<blockquote class="cdx-block quote-block">
              <p>"${data.text}"</p>
              <footer>${data.caption}</footer>
            </blockquote>`;
  },

  code: (block: Block) => {
    const data = block.data as CodeData;
    return `<pre class="cdx-block code-block"><code>${data.code}</code></pre>`;
  },

  delimiter: (block: Block) => {
    return '<hr class="cdx-block delimiter-block">';
  },

  warning: (block: Block) => {
    const data = block.data as WarningData;
    return `<div class="cdx-block warning-block">
              <h3>${data.title}</h3>
              <p>${data.message}</p>
            </div>`;
  },
};

export function getBlogContentHTMLFromSavedData(savedData: any) {
  const edjsParser = edjsHTML(customParsers);
  const html = edjsParser.parse(savedData);
  return html.join("");
}
