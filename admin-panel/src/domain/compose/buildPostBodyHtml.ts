import type { ContentBlock } from "../model/ContentBlock";

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Applies inline formatting: **bold** -> <strong>, *italic* -> <em>, ~~strikethrough~~ -> <s>.
 * Run after escapeHtml so output is safe.
 */
function applyInlineFormatting(escaped: string): string {
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/~~([^~]+)~~/g, "<s>$1</s>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/_([^_]+)_/g, "<em>$1</em>");
}

/**
 * Builds the post body HTML fragment to be used in personal-blog PostScreen.
 * Uses classes compatible with personal-blog .main-content-text styles.
 * Paragraphs and headings support **bold** and *italic* (or __bold__ and _italic_).
 */
export function buildPostBodyHtml(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph": {
          const escaped = escapeHtml(block.text).replace(/\n/g, "<br>");
          return `<p>${applyInlineFormatting(escaped)}</p>`;
        }
        case "image":
          return `<figure class="post-body-figure"><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt)}" class="post-body-image" /></figure>`;
        case "heading": {
          const escaped = escapeHtml(block.text);
          return `<h${block.level}>${applyInlineFormatting(escaped)}</h${block.level}>`;
        }
        default:
          return "";
      }
    })
    .join("\n");
}
