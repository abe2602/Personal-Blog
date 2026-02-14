import { useComposeStore } from "./ComposeStore";
import { buildPostBodyHtml } from "../../../domain/compose/buildPostBodyHtml";
import type * as PostsRepository from "../../../data/posts/PostsRepository";
import type { ApiPost } from "../../../data/posts/model/ApiPost";

export default function ComposeController({
  postsRepository,
}: {
  postsRepository: typeof PostsRepository;
}) {
  const store = useComposeStore.getState();

  function getState() {
    return {
      title: store.title,
      date: store.date,
      featuredImageUrl: store.featuredImageUrl,
      blocks: store.blocks,
    };
  }

  function getBodyHtml(): string {
    return buildPostBodyHtml(store.blocks);
  }

  /**
   * Full HTML fragment for the post content area as used in PostScreen:
   * title, date, featured image, then body (so you can paste into backend or static HTML).
   */
  function getFullPostContentHtml(): string {
    const title = escapeForHtml(store.title);
    const date = store.date;
    const dateFormatted = date ? new Date(date + "T12:00:00").toLocaleDateString() : "";
    const img = store.featuredImageUrl
      ? `<img src="${escapeForHtml(store.featuredImageUrl)}" alt="${title}" class="post-image" />`
      : "";
    const body = getBodyHtml();
    return `<div class="main-content-text">
  <h3>${title}</h3>
  <small>${dateFormatted}</small>
  ${img}
  <div class="post-body">${body}</div>
</div>`;
  }

  function buildApiPost(): ApiPost {
    const body = getBodyHtml();
    const creationDate = store.date
      ? `${store.date}T12:00:00`
      : new Date().toISOString().slice(0, 19);
    return {
      id: 0,
      userId: 1,
      title: store.title.trim(),
      body,
      imageUrl: store.featuredImageUrl.trim() || null,
      type: store.postType,
      creationDate,
      recommendedPosts: [],
    };
  }

  async function savePost(): Promise<ApiPost> {
    const post = buildApiPost();
    return postsRepository.createPost(post);
  }

  const state = getState();
  const actions = {
    getBodyHtml,
    getFullPostContentHtml,
    savePost,
  };

  return {
    actions,
    state,
  };
}

function escapeForHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
