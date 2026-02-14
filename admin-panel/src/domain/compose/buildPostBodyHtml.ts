import type { ContentBlock } from "../model/ContentBlock";

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Builds the post body HTML fragment to be used in personal-blog PostScreen.
 * Uses classes compatible with personal-blog .main-content-text styles.
 */
export function buildPostBodyHtml(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph":
          return `<p>${escapeHtml(block.text)}</p>`;
        case "image":
          return `<figure class="post-body-figure"><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt)}" class="post-body-image" /></figure>`;
        case "heading":
          return `<h${block.level}>${escapeHtml(block.text)}</h${block.level}>`;
        default:
          return "";
      }
    })
    .join("\n");
}
