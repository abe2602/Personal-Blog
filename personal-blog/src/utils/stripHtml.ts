/**
 * Strips HTML tags to get plain text. Use for list/preview where description may be HTML.
 */
export function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent ?? div.innerText ?? "";
}
