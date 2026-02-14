export type ParagraphBlock = {
  id: string;
  type: "paragraph";
  text: string;
};

export type ImageBlock = {
  id: string;
  type: "image";
  src: string;
  alt: string;
};

export type HeadingBlock = {
  id: string;
  type: "heading";
  level: 2 | 3 | 4;
  text: string;
};

export type ContentBlock = ParagraphBlock | ImageBlock | HeadingBlock;

export function createParagraphBlock(id: string, text: string = ""): ParagraphBlock {
  return { id, type: "paragraph", text };
}

export function createImageBlock(id: string, src: string = "", alt: string = ""): ImageBlock {
  return { id, type: "image", src, alt };
}

export function createHeadingBlock(id: string, level: 2 | 3 | 4 = 3, text: string = ""): HeadingBlock {
  return { id, type: "heading", level, text };
}
