/**
 * Strips HTML tags to get plain text. Use for list/preview where description may be HTML.
 * <br> and <br/> are converted to newlines so line breaks are preserved.
 */
export function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  div.querySelectorAll("br").forEach((br) => {
    br.replaceWith("\n");
  });
  return div.textContent ?? div.innerText ?? "";
}
