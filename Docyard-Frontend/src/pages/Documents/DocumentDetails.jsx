import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getDocumentBySlug,
  downloadDocument,
} from "../services/document.js";

import {
  addBookmark,
  removeBookmark,
  checkBookmarkStatus,
} from "../services/bookmark.js";

import {
  likeDocument,
  unlikeDocument,
  checkLikeStatus,
  getLikeCount,
} from "../services/like.js";

import {
  addComment,
  getDocumentComments,
  updateComment,
  deleteComment,
} from "../services/comment.js";

const DocumentDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [document, setDocument] = useState(null);
  const [comments, setComments] = useState([]);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] =
    useState(true);

  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] =
    useState(false);

  // ==========================================
  // LOAD DOCUMENT
  // ==========================================

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getDocumentBySlug(slug);

        const data =
          response?.data?.document ||
          response?.document ||
          response?.data ||
          null;

        setDocument(data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load document."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadDocument();
    }
  }, [slug]);

  // ==========================================
  // LOAD INTERACTIONS
  // ==========================================

  useEffect(() => {
    if (!document?._id) return;

    const loadInteractions = async () => {
      try {
        const [
          bookmarkResponse,
          likeResponse,
          countResponse,
        ] = await Promise.allSettled([
          checkBookmarkStatus(document._id),
          checkLikeStatus(document._id),
          getLikeCount(document._id),
        ]);

        if (
          bookmarkResponse.status === "fulfilled"
        ) {
          const data =
            bookmarkResponse.value;

          setIsBookmarked(
            data?.data?.isBookmarked ??
              data?.isBookmarked ??
              false
          );
        }

        if (likeResponse.status === "fulfilled") {
          const data = likeResponse.value;

          setIsLiked(
            data?.data?.isLiked ??
              data?.isLiked ??
              false
          );
        }

        if (countResponse.status === "fulfilled") {
          const data = countResponse.value;

          setLikeCount(
            data?.data?.count ??
              data?.count ??
              0
          );
        }
      } catch {
        // Interaction state is optional.
      }
    };

    loadInteractions();
  }, [document?._id]);

  // ==========================================
  // LOAD COMMENTS
  // ==========================================

  useEffect(() => {
    if (!document?._id) return;

    const loadComments = async () => {
      setCommentsLoading(true);

      try {
        const response =
          await getDocumentComments(
            document._id
          );

        const data =
          response?.data?.comments ||
          response?.comments ||
          response?.data ||
          [];

        setComments(
          Array.isArray(data) ? data : []
        );
      } catch {
        setComments([]);
      } finally {
        setCommentsLoading(false);
      }
    };

    loadComments();
  }, [document?._id]);

  // ==========================================
  // BOOKMARK
  // ==========================================

  const handleBookmark = async () => {
    if (!document?._id || actionLoading) return;

    setActionLoading(true);

    try {
      if (isBookmarked) {
        await removeBookmark(document._id);
        setIsBookmarked(false);
      } else {
        await addBookmark(document._id);
        setIsBookmarked(true);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update bookmark."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // LIKE
  // ==========================================

  const handleLike = async () => {
    if (!document?._id || actionLoading) return;

    setActionLoading(true);

    try {
      if (isLiked) {
        await unlikeDocument(document._id);
        setIsLiked(false);
        setLikeCount((count) =>
          Math.max(0, count - 1)
        );
      } else {
        await likeDocument(document._id);
        setIsLiked(true);
        setLikeCount((count) => count + 1);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update like."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // DOWNLOAD
  // ==========================================

  const handleDownload = async () => {
    if (!document?._id) return;

    try {
      const response =
        await downloadDocument(
          document._id
        );

      const blob = new Blob([
        response.data,
      ]);

      const url =
        window.URL.createObjectURL(blob);

      const anchor =
        window.document.createElement("a");

      anchor.href = url;

      anchor.download =
        document.title ||
        "document";

      window.document.body.appendChild(
        anchor
      );

      anchor.click();
      anchor.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to download document."
      );
    }
  };

  // ==========================================
  // ADD COMMENT
  // ==========================================

  const handleAddComment = async (event) => {
    event.preventDefault();

    if (!comment.trim()) return;

    try {
      const response = await addComment(
        document._id,
        {
          content: comment.trim(),
        }
      );

      const newComment =
        response?.data?.comment ||
        response?.comment ||
        null;

      if (newComment) {
        setComments((previous) => [
          ...previous,
          newComment,
        ]);
      } else {
        const refreshed =
          await getDocumentComments(
            document._id
          );

        const data =
          refreshed?.data?.comments ||
          refreshed?.comments ||
          refreshed?.data ||
          [];

        setComments(
          Array.isArray(data) ? data : []
        );
      }

      setComment("");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to add comment."
      );
    }
  };

  // ==========================================
  // UPDATE COMMENT
  // ==========================================

  const handleUpdateComment = async (
    commentId
  ) => {
    if (!editContent.trim()) return;

    try {
      const response =
        await updateComment(
          commentId,
          editContent.trim()
        );

      const updated =
        response?.data?.comment ||
        response?.comment ||
        null;

      setComments((previous) =>
        previous.map((item) =>
          item._id === commentId
            ? updated || {
                ...item,
                content:
                  editContent.trim(),
              }
            : item
        )
      );

      setEditingComment(null);
      setEditContent("");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update comment."
      );
    }
  };

  // ==========================================
  // DELETE COMMENT
  // ==========================================

  const handleDeleteComment = async (
    commentId
  ) => {
    const confirmed = window.confirm(
      "Delete this comment?"
    );

    if (!confirmed) return;

    try {
      await deleteComment(commentId);

      setComments((previous) =>
        previous.filter(
          (item) => item._id !== commentId
        )
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to delete comment."
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-paper px-6 py-20 text-ink md:px-12">
        <div className="mx-auto max-w-[1180px]">

          <div className="h-3 w-24 bg-paper-raised" />

          <div className="mt-6 h-12 max-w-3xl bg-paper-raised" />

          <div className="mt-4 h-4 max-w-xl bg-paper-raised" />

          <div className="mt-12 h-[500px] w-full bg-paper-raised" />

        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR / NOT FOUND
  // ==========================================

  if (!document) {
    return (
      <main className="min-h-screen bg-paper px-6 py-20 text-ink md:px-12">
        <div className="mx-auto max-w-[760px] text-center">

          <span className="page-eyebrow">
            DOCYARD
          </span>

          <h1 className="mt-3 font-display text-5xl font-semibold">
            Document not found.
          </h1>

          <p className="mt-4 text-sm text-ink-soft">
            {error ||
              "The document you're looking for could not be found."}
          </p>

          <Link
            to="/documents"
            className="btn btn-primary mt-7"
          >
            Browse documents
          </Link>

        </div>
      </main>
    );
  }

  const author =
    document.author?.name ||
    document.author?.username ||
    document.author ||
    document.createdBy?.username ||
    "Unknown contributor";

  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* ====================================== */}
      {/* DOCUMENT HEADER                        */}
      {/* ====================================== */}

      <section className="border-b border-line px-6 py-12 md:px-12 md:py-16">

        <div className="mx-auto max-w-[1180px]">

          <Link
            to="/documents"
            className="font-mono text-[10px] uppercase tracking-wide text-ink-faint transition-colors hover:text-blue"
          >
            ← Back to archive
          </Link>

          <div className="mt-10 max-w-4xl">

            <div className="flex flex-wrap items-center gap-3">

              <span className="font-mono text-[10px] uppercase tracking-wide text-blue">
                {document.category ||
                  "Archive"}
              </span>

              {document.fileType && (
                <span className="font-mono text-[10px] uppercase text-ink-faint">
                  {document.fileType}
                </span>
              )}

            </div>

            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
              {document.title}
            </h1>

            {document.description && (
              <p className="mt-6 max-w-3xl text-base leading-7 text-ink-soft">
                {document.description}
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] text-ink-faint">

              <span>
                By {author}
              </span>

              {document.createdAt && (
                <span>
                  {new Date(
                    document.createdAt
                  ).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              )}

              {document.language && (
                <span>
                  {document.language}
                </span>
              )}

            </div>

          </div>

        </div>

      </section>


      {/* ====================================== */}
      {/* MAIN CONTENT                           */}
      {/* ====================================== */}

      <section className="px-6 py-10 md:px-12 md:py-14">

        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">

          {/* DOCUMENT VIEWER */}

          <div>

            <div className="overflow-hidden border border-line bg-white">

              {document.fileUrl ? (
                <iframe
                  src={document.fileUrl}
                  title={document.title}
                  className="h-[700px] w-full"
                />
              ) : (
                <div className="flex h-[500px] items-center justify-center bg-paper-raised">

                  <div className="text-center">

                    <span className="font-mono text-[10px] uppercase text-ink-faint">
                      Document preview
                    </span>

                    <p className="mt-2 text-sm text-ink-soft">
                      Preview unavailable.
                    </p>

                  </div>

                </div>
              )}

            </div>


            {/* ACTION BAR */}

            <div className="flex flex-wrap items-center justify-between gap-4 border-x border-b border-line px-5 py-4">

              <div className="flex items-center gap-5">

                <button
                  type="button"
                  onClick={handleLike}
                  disabled={actionLoading}
                  className={`font-mono text-[10px] uppercase tracking-wide transition-colors ${
                    isLiked
                      ? "text-blue"
                      : "text-ink-faint hover:text-ink"
                  }`}
                >
                  {isLiked
                    ? "♥ Liked"
                    : "♡ Like"}

                  <span className="ml-2">
                    {likeCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleBookmark}
                  disabled={actionLoading}
                  className={`font-mono text-[10px] uppercase tracking-wide transition-colors ${
                    isBookmarked
                      ? "text-blue"
                      : "text-ink-faint hover:text-ink"
                  }`}
                >
                  {isBookmarked
                    ? "★ Saved"
                    : "☆ Save"}
                </button>

              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="btn btn-primary"
              >
                Download
              </button>

            </div>

          </div>


          {/* ================================= */}
          {/* METADATA                           */}
          {/* ================================= */}

          <aside>

            <div className="border-t border-line">

              <div className="border-b border-line py-5">

                <span className="page-eyebrow">
                  DOCUMENT DETAILS
                </span>

              </div>


              <dl>

                <div className="border-b border-line py-4">

                  <dt className="font-mono text-[10px] uppercase text-ink-faint">
                    Title
                  </dt>

                  <dd className="mt-2 text-sm">
                    {document.title}
                  </dd>

                </div>


                <div className="border-b border-line py-4">

                  <dt className="font-mono text-[10px] uppercase text-ink-faint">
                    Contributor
                  </dt>

                  <dd className="mt-2 text-sm">
                    {author}
                  </dd>

                </div>


                {document.category && (
                  <div className="border-b border-line py-4">

                    <dt className="font-mono text-[10px] uppercase text-ink-faint">
                      Category
                    </dt>

                    <dd className="mt-2 text-sm">
                      {document.category}
                    </dd>

                  </div>
                )}


                {document.language && (
                  <div className="border-b border-line py-4">

                    <dt className="font-mono text-[10px] uppercase text-ink-faint">
                      Language
                    </dt>

                    <dd className="mt-2 text-sm">
                      {document.language}
                    </dd>

                  </div>
                )}


                {document.fileSize && (
                  <div className="border-b border-line py-4">

                    <dt className="font-mono text-[10px] uppercase text-ink-faint">
                      File size
                    </dt>

                    <dd className="mt-2 text-sm">
                      {document.fileSize}
                    </dd>

                  </div>
                )}

              </dl>

            </div>

          </aside>

        </div>

      </section>


      {/* ====================================== */}
      {/* COMMENTS                               */}
      {/* ====================================== */}

      <section className="border-t border-line px-6 py-12 md:px-12 md:py-16">

        <div className="mx-auto max-w-[900px]">

          <div className="mb-8">

            <span className="page-eyebrow">
              DISCUSSION
            </span>

            <h2 className="mt-2 font-display text-3xl font-semibold">
              Comments
            </h2>

          </div>


          {/* ADD COMMENT */}

          <form
            onSubmit={handleAddComment}
            className="border border-line bg-white p-5"
          >

            <label
              htmlFor="comment"
              className="form-label"
            >
              Add a comment
            </label>

            <textarea
              id="comment"
              value={comment}
              onChange={(event) =>
                setComment(event.target.value)
              }
              placeholder="Share something about this document..."
              rows={4}
              className="form-textarea"
            />

            <div className="mt-4 flex justify-end">

              <button
                type="submit"
                className="btn btn-primary"
              >
                Post comment
              </button>

            </div>

          </form>


          {/* COMMENT LIST */}

          <div className="mt-8">

            {commentsLoading ? (
              <div className="py-8 font-mono text-[10px] uppercase text-ink-faint">
                Loading comments...
              </div>
            ) : comments.length === 0 ? (
              <div className="border-t border-line py-8 text-sm text-ink-soft">
                No comments yet.
              </div>
            ) : (
              comments.map((item) => {

                const commenter =
                  item.user?.username ||
                  item.user?.name ||
                  item.username ||
                  "Contributor";

                return (
                  <article
                    key={item._id}
                    className="border-t border-line py-6"
                  >

                    <div className="flex flex-wrap items-center justify-between gap-3">

                      <div>

                        <span className="font-mono text-[10px] uppercase text-blue">
                          {commenter}
                        </span>

                        {item.createdAt && (
                          <span className="ml-4 font-mono text-[10px] text-ink-faint">
                            {new Date(
                              item.createdAt
                            ).toLocaleDateString()}
                          </span>
                        )}

                      </div>

                    </div>


                    {editingComment ===
                    item._id ? (
                      <div className="mt-4">

                        <textarea
                          value={editContent}
                          onChange={(event) =>
                            setEditContent(
                              event.target.value
                            )
                          }
                          rows={3}
                          className="form-textarea"
                        />

                        <div className="mt-3 flex gap-3">

                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateComment(
                                item._id
                              )
                            }
                            className="btn btn-primary"
                          >
                            Save
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingComment(
                                null
                              );
                              setEditContent("");
                            }}
                            className="btn btn-ghost"
                          >
                            Cancel
                          </button>

                        </div>

                      </div>
                    ) : (
                      <>
                        <p className="mt-3 text-sm leading-6 text-ink-soft">
                          {item.content}
                        </p>

                        <div className="mt-4 flex gap-4">

                          <button
                            type="button"
                            onClick={() => {
                              setEditingComment(
                                item._id
                              );
                              setEditContent(
                                item.content || ""
                              );
                            }}
                            className="font-mono text-[10px] uppercase text-ink-faint hover:text-ink"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteComment(
                                item._id
                              )
                            }
                            className="font-mono text-[10px] uppercase text-ink-faint hover:text-ink"
                          >
                            Delete
                          </button>

                        </div>
                      </>
                    )}

                  </article>
                );
              })
            )}

          </div>

        </div>

      </section>

    </main>
  );
};

export default DocumentDetails;