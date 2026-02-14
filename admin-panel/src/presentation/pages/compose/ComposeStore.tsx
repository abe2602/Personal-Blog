import { create } from "zustand";
import type { ContentBlock } from "../../../domain/model/ContentBlock";
import type { PostType } from "../../../data/posts/model/ApiPost";
import {
  createParagraphBlock,
  createImageBlock,
  createHeadingBlock,
} from "../../../domain/model/ContentBlock";

function generateId(): string {
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface ComposeState {
  title: string;
  date: string;
  featuredImageUrl: string;
  postType: PostType;
  blocks: ContentBlock[];
  setTitle: (title: string) => void;
  setDate: (date: string) => void;
  setFeaturedImageUrl: (url: string) => void;
  setPostType: (postType: PostType) => void;
  setBlocks: (blocks: ContentBlock[]) => void;
  addParagraph: () => void;
  addImage: () => void;
  addHeading: (level?: 2 | 3 | 4) => void;
  updateBlock: (id: string, updates: Partial<ContentBlock>) => void;
  removeBlock: (id: string) => void;
  moveBlock: (id: string, direction: "up" | "down") => void;
  reset: () => void;
}

export const useComposeStore = create<ComposeState>()((set) => ({
  title: "",
  date: new Date().toISOString().slice(0, 10),
  featuredImageUrl: "",
  postType: "THOUGHTS",
  blocks: [],

  setTitle: (title) => set({ title }),
  setDate: (date) => set({ date }),
  setFeaturedImageUrl: (featuredImageUrl) => set({ featuredImageUrl }),
  setPostType: (postType) => set({ postType }),
  setBlocks: (blocks) => set({ blocks }),

  addParagraph: () =>
    set((s) => ({
      blocks: [...s.blocks, createParagraphBlock(generateId())],
    })),

  addImage: () =>
    set((s) => ({
      blocks: [...s.blocks, createImageBlock(generateId())],
    })),

  addHeading: (level = 3) =>
    set((s) => ({
      blocks: [...s.blocks, createHeadingBlock(generateId(), level)],
    })),

  updateBlock: (id, updates) =>
    set((s) => ({
      blocks: s.blocks.map((b) =>
        b.id === id ? ({ ...b, ...updates } as ContentBlock) : b
      ),
    })),

  removeBlock: (id) =>
    set((s) => ({
      blocks: s.blocks.filter((b) => b.id !== id),
    })),

  moveBlock: (id, direction) =>
    set((s) => {
      const i = s.blocks.findIndex((b) => b.id === id);
      if (i === -1) return s;
      if (direction === "up" && i === 0) return s;
      if (direction === "down" && i === s.blocks.length - 1) return s;
      const blocks = [...s.blocks];
      const j = direction === "up" ? i - 1 : i + 1;
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
      return { blocks };
    }),

  reset: () =>
    set({
      title: "",
      date: new Date().toISOString().slice(0, 10),
      featuredImageUrl: "",
      postType: "THOUGHTS",
      blocks: [],
    }),
}));
