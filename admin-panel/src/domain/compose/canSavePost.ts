import type { ContentBlock } from "../model/ContentBlock";

function hasBlockContent(block: ContentBlock): boolean {
  switch (block.type) {
    case "image":
      return block.src.trim().length > 0;
    case "paragraph":
    case "heading":
      return block.text.trim().length > 0;
    default:
      return false;
  }
}

/**
 * Save is allowed when there is a title and at least one image (featured or block) or text block.
 */
export function canSavePost(
  title: string,
  featuredImageUrl: string,
  blocks: ContentBlock[]
): boolean {
  const hasTitle = title.trim().length > 0;
  const hasFeaturedImage = featuredImageUrl.trim().length > 0;
  const hasContentBlock = blocks.some(hasBlockContent);
  return hasTitle && (hasFeaturedImage || hasContentBlock);
}
