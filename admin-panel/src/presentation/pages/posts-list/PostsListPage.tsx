import { useEffect, useLayoutEffect, useState } from "react";
import DI from "../../../di/DiModule";
import { usePostsListStore } from "./PostsListStore";
import type { ApiPost, PostType } from "../../../data/posts/model/ApiPost";

const PostTypes: PostType[] = ["THOUGHTS", "FAVORITE_CONTENT", "MEDIA"];

const PostsListPage = () => {
  const { actions } = DI.resolve("PostsListController");
  const {
    posts,
    isLoading,
    error,
    selectedPost,
    drawerOpen,
    currentPage,
    totalPosts,
    postsPerPage,
  } = usePostsListStore();
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Pick<ApiPost, "title" | "body" | "imageUrl" | "type" | "creationDate">>({
    title: "",
    body: "",
    imageUrl: null,
    type: "THOUGHTS",
    creationDate: "",
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    actions.loadPosts();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      actions.loadPosts();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage]);

  useEffect(() => {
    if (selectedPost) {
      setEditForm({
        title: selectedPost.title,
        body: selectedPost.body,
        imageUrl: selectedPost.imageUrl,
        type: selectedPost.type,
        creationDate: selectedPost.creationDate.slice(0, 10),
      });
      setEditMode(false);
    }
  }, [selectedPost]);

  const handleRowClick = (post: ApiPost) => {
    actions.openDrawer(post);
  };

  const handleCloseDrawer = () => {
    actions.closeDrawer();
    setEditMode(false);
    setDeleteConfirmOpen(false);
  };

  const handleSaveEdit = async () => {
    if (!selectedPost) return;
    setSaveLoading(true);
    try {
      await actions.updatePost(selectedPost.id, {
        title: editForm.title,
        body: editForm.body,
        imageUrl: editForm.imageUrl,
        type: editForm.type,
        creationDate: editForm.creationDate.includes("T")
          ? editForm.creationDate
          : `${editForm.creationDate}T12:00:00`,
      });
      setEditMode(false);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    const ok = await actions.deletePost(selectedPost.id);
    if (ok) {
      setDeleteConfirmOpen(false);
      handleCloseDrawer();
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = dateStr.includes("T") ? new Date(dateStr) : new Date(dateStr + "T12:00:00");
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading && posts.length === 0) {
    return (
      <div className="main-container">
        <div className="content-layout">
          <div className="posts-section">
            <p>Loading posts…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="main-container">
        <div className="content-layout">
          <div className="posts-section">
            <p className="posts-list-error">Error: {error}</p>
            <button
              type="button"
              className="compose-btn compose-btn-secondary"
              onClick={() => actions.loadPosts()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    actions.setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="pagination-button"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis-start" className="pagination-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis-end" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="pagination-button"
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button pagination-nav"
        >
          Previous
        </button>
        <div className="pagination-numbers">{pages}</div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button pagination-nav"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="main-container">
      <div className="content-layout">
        <h1 className="posts-list-heading">All Posts</h1>
        <p className="posts-list-description">
          Click a row to open the post details. You can edit or delete from the drawer.
        </p>

        <div className="posts-list-table-wrap">
          <table className="posts-list-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Creation date</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="posts-list-empty">
                    No posts yet.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="posts-list-row"
                    onClick={() => handleRowClick(post)}
                  >
                    <td>{post.id}</td>
                    <td>{formatDate(post.creationDate)}</td>
                    <td>{post.title || "(No title)"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {renderPagination()}
      </div>

      {drawerOpen && selectedPost && (
        <>
          <div
            className="posts-drawer-backdrop"
            onClick={handleCloseDrawer}
            aria-hidden
          />
          <aside
            className="posts-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="posts-drawer-title"
          >
            <div className="posts-drawer-header">
              <h2 id="posts-drawer-title">
                {editMode ? "Edit post" : "Post details"}
              </h2>
              <button
                type="button"
                className="posts-drawer-close"
                onClick={handleCloseDrawer}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="posts-drawer-body">
              {editMode ? (
                <div className="posts-drawer-form">
                  <label className="compose-label">
                    Title
                    <input
                      type="text"
                      className="compose-input"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, title: e.target.value }))
                      }
                    />
                  </label>
                  <label className="compose-label">
                    Creation date
                    <input
                      type="date"
                      className="compose-input"
                      value={editForm.creationDate}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          creationDate: e.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="compose-label">
                    Featured image URL
                    <input
                      type="url"
                      className="compose-input"
                      value={editForm.imageUrl ?? ""}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          imageUrl: e.target.value.trim() || null,
                        }))
                      }
                      placeholder="https://..."
                    />
                  </label>
                  <label className="compose-label">
                    Type
                    <select
                      className="compose-input compose-select"
                      value={editForm.type}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          type: e.target.value as PostType,
                        }))
                      }
                    >
                      {PostTypes.map((t) => (
                        <option key={t} value={t}>
                          {t === "THOUGHTS"
                            ? "Thoughts"
                            : t === "FAVORITE_CONTENT"
                              ? "Favorites"
                              : "Gallery"}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="compose-label">
                    Body (HTML)
                    <textarea
                      className="compose-textarea"
                      value={editForm.body}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, body: e.target.value }))
                      }
                      rows={10}
                    />
                  </label>
                  <div className="posts-drawer-actions">
                    <button
                      type="button"
                      className="compose-btn compose-btn-primary"
                      onClick={handleSaveEdit}
                      disabled={saveLoading}
                    >
                      {saveLoading ? "Saving…" : "Save"}
                    </button>
                    <button
                      type="button"
                      className="compose-btn compose-btn-secondary"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <dl className="posts-drawer-dl">
                    <dt>ID</dt>
                    <dd>{selectedPost.id}</dd>
                    <dt>Title</dt>
                    <dd>{selectedPost.title || "(No title)"}</dd>
                    <dt>Creation date</dt>
                    <dd>{formatDate(selectedPost.creationDate)}</dd>
                    <dt>Type</dt>
                    <dd>{selectedPost.type}</dd>
                    {selectedPost.imageUrl && (
                      <>
                        <dt>Featured image</dt>
                        <dd>
                          <a
                            href={selectedPost.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {selectedPost.imageUrl}
                          </a>
                          <img
                            src={selectedPost.imageUrl}
                            alt=""
                            className="posts-drawer-thumb"
                          />
                        </dd>
                      </>
                    )}
                    <dt>Body</dt>
                    <dd>
                      <div
                        className="posts-drawer-body-preview post-body"
                        dangerouslySetInnerHTML={{
                          __html:
                            selectedPost.body ||
                            "<p><em>No content.</em></p>",
                        }}
                      />
                    </dd>
                  </dl>
                  <div className="posts-drawer-actions">
                    <button
                      type="button"
                      className="compose-btn compose-btn-primary"
                      onClick={() => setEditMode(true)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="compose-btn compose-btn-secondary posts-drawer-delete"
                      onClick={() => setDeleteConfirmOpen(true)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </>
      )}

      {deleteConfirmOpen && selectedPost && (
        <div
          className="compose-dialog-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div className="compose-dialog">
            <h2 id="delete-dialog-title" className="compose-dialog-title">
              Delete post?
            </h2>
            <p className="compose-dialog-message">
              “{selectedPost.title || "(No title)"}” will be permanently
              deleted. This cannot be undone.
            </p>
            <div className="posts-drawer-actions">
              <button
                type="button"
                className="compose-btn compose-btn-secondary"
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="compose-btn compose-btn-primary posts-drawer-delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsListPage;
