import { useState } from "react";
import DI from "../../../di/DiModule";
import { useComposeStore } from "./ComposeStore";
import type { ContentBlock } from "../../../domain/model/ContentBlock";
import { canSavePost } from "../../../domain/compose/canSavePost";
import type { PostType } from "../../../data/posts/model/ApiPost";

const ComposePage = () => {
  const { actions } = DI.resolve("ComposeController");
  const {
    title,
    date,
    featuredImageUrl,
    postType,
    blocks,
    setTitle,
    setDate,
    setFeaturedImageUrl,
    setPostType,
    addParagraph,
    addImage,
    addHeading,
    updateBlock,
    removeBlock,
    moveBlock,
    reset,
  } = useComposeStore();

  const [saveLoading, setSaveLoading] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const canSave = canSavePost(title, featuredImageUrl, blocks);

  const handleSavePost = async () => {
    if (!canSave || saveLoading) return;
    setSaveLoading(true);
    setErrorDialogOpen(false);
    try {
      await actions.savePost();
      reset();
    } catch {
      setErrorDialogOpen(true);
    } finally {
      setSaveLoading(false);
    }
  };

  const dateFormatted = date ? new Date(date + "T12:00:00").toLocaleDateString() : "";
  const previewBodyHtml = actions.getBodyHtml();

  return (
    <div className="main-container">
      {saveLoading && (
        <div className="compose-loading-overlay" aria-hidden>
          <span className="compose-loading-text">Saving post…</span>
        </div>
      )}
      {errorDialogOpen && (
        <div className="compose-dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="compose-error-title">
          <div className="compose-dialog">
            <h2 id="compose-error-title" className="compose-dialog-title">Something went wrong</h2>
            <p className="compose-dialog-message">
              The post could not be saved. Check that the backend is running and try again.
            </p>
            <button
              type="button"
              className="compose-btn compose-btn-primary"
              onClick={() => setErrorDialogOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="content-layout">
        <div className="compose-grid">
          <section className="compose-editor">
            <h1 className="compose-heading">Compose Post</h1>
            <p className="compose-description">
              Add blocks below. The output HTML is used on the PostScreen in personal-blog.
            </p>

            <div className="compose-form">
              <label className="compose-label">
                Title
                <input
                  type="text"
                  className="compose-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title"
                />
              </label>
              <label className="compose-label">
                Date
                <input
                  type="date"
                  className="compose-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label className="compose-label">
                Featured image URL
                <input
                  type="url"
                  className="compose-input"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  placeholder="https://..."
                />
              </label>
              <label className="compose-label">
                Type
                <select
                  className="compose-input compose-select"
                  value={postType}
                  onChange={(e) => setPostType(e.target.value as PostType)}
                >
                  <option value="THOUGHTS">Thoughts</option>
                  <option value="FAVORITE_CONTENT">Favorites</option>
                  <option value="MEDIA">Gallery</option>
                </select>
              </label>
            </div>

            <div className="compose-blocks">
              <div className="compose-blocks-toolbar">
                <span className="compose-blocks-label">Body blocks</span>
                <div className="compose-blocks-actions">
                  <button type="button" className="compose-btn compose-btn-secondary" onClick={addParagraph}>
                    + Paragraph
                  </button>
                  <button type="button" className="compose-btn compose-btn-secondary" onClick={addImage}>
                    + Image
                  </button>
                  <button type="button" className="compose-btn compose-btn-secondary" onClick={() => addHeading(2)}>
                    + H2
                  </button>
                  <button type="button" className="compose-btn compose-btn-secondary" onClick={() => addHeading(3)}>
                    + H3
                  </button>
                  <button type="button" className="compose-btn compose-btn-secondary" onClick={() => addHeading(4)}>
                    + H4
                  </button>
                </div>
              </div>

              {blocks.length === 0 && (
                <p className="compose-empty">No blocks yet. Add a paragraph, image, or heading above.</p>
              )}

              {blocks.map((block, index) => (
                <BlockEditor
                  key={block.id}
                  block={block}
                  index={index}
                  total={blocks.length}
                  onUpdate={(updates) => updateBlock(block.id, updates)}
                  onRemove={() => removeBlock(block.id)}
                  onMoveUp={() => moveBlock(block.id, "up")}
                  onMoveDown={() => moveBlock(block.id, "down")}
                />
              ))}
            </div>

            <div className="compose-save">
              <h2 className="compose-export-title">Save to blog</h2>
              <p className="compose-export-desc">
                Requires a title and at least one image (featured or in body) or text block.
              </p>
              <button
                type="button"
                className="compose-btn compose-btn-primary compose-btn-save"
                onClick={handleSavePost}
                disabled={!canSave || saveLoading}
              >
                {saveLoading ? "Saving…" : "Save post"}
              </button>
            </div>
          </section>

          <aside className="compose-preview">
            <h2 className="compose-preview-title">Preview (PostScreen style)</h2>
            <div className="compose-preview-content main-content">
              <div className="main-content-post">
                <div className="main-content-text">
                  <h3>{title || "Post title"}</h3>
                  <small>{dateFormatted || "Date"}</small>
                  {featuredImageUrl && (
                    <img src={featuredImageUrl} alt={title || "Post"} className="post-image" />
                  )}
                  <div
                    className="post-body"
                    dangerouslySetInnerHTML={{ __html: previewBodyHtml || "<p><em>Add blocks to see content.</em></p>" }}
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

function BlockEditor({
  block,
  index,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  block: ContentBlock;
  index: number;
  total: number;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="compose-block">
      <div className="compose-block-header">
        <span className="compose-block-type">{block.type}</span>
        <div className="compose-block-controls">
          <button type="button" className="compose-block-btn" onClick={onMoveUp} disabled={index === 0} title="Move up">
            ↑
          </button>
          <button type="button" className="compose-block-btn" onClick={onMoveDown} disabled={index === total - 1} title="Move down">
            ↓
          </button>
          <button type="button" className="compose-block-btn compose-block-btn-remove" onClick={onRemove} title="Remove">
            ×
          </button>
        </div>
      </div>
      <div className="compose-block-body">
        {block.type === "paragraph" && (
          <textarea
            className="compose-block-input"
            value={block.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            placeholder="Paragraph text..."
            rows={3}
          />
        )}
        {block.type === "image" && (
          <>
            <input
              type="url"
              className="compose-block-input"
              value={block.src}
              onChange={(e) => onUpdate({ src: e.target.value })}
              placeholder="Image URL"
            />
            <input
              type="text"
              className="compose-block-input"
              value={block.alt}
              onChange={(e) => onUpdate({ alt: e.target.value })}
              placeholder="Alt text"
            />
            {block.src && <img src={block.src} alt={block.alt} className="compose-block-thumb" />}
          </>
        )}
        {block.type === "heading" && (
          <>
            <select
              className="compose-block-select"
              value={block.level}
              onChange={(e) => onUpdate({ level: Number(e.target.value) as 2 | 3 | 4 })}
            >
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
            </select>
            <input
              type="text"
              className="compose-block-input"
              value={block.text}
              onChange={(e) => onUpdate({ text: e.target.value })}
              placeholder="Heading text..."
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ComposePage;
