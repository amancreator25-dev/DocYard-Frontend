import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getDocumentBySlug, downloadDocument } from "../services/document.js";
import {
  likeDocument,
  unlikeDocument,
  checkLikeStatus,
  getLikeCount,
} from "../services/like.js";
import {
  addBookmark,
  removeBookmark,
  checkBookmarkStatus,
} from "../services/bookmark.js";
import {
  addComment,
  getDocumentComments,
  updateComment,
  deleteComment,
} from "../services/comment.js";

import useAuth from "../hooks/useAuth.js";


// ======================================
// DOCUMENT DETAILS
// ======================================

const DocumentDetails = () => {
  const { slug } = useParams();

  const { user, isAuthenticated } = useAuth();

  const [document, setDocument] = useState(null);
  const [comments, setComments] = useState([]);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  const [commentError, setCommentError] = useState("");


// ======================================
// LOAD DOCUMENT
// ======================================

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getDocumentBySlug(slug);

        const documentData =
          response?.data?.document ||
          response?.document ||
          response?.data ||
          null;

        setDocument(documentData);

        if (documentData?._id) {
          loadInteractions(documentData._id);
        }

      } catch (err) {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load document."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [slug]);


// ======================================
// LOAD INTERACTIONS
// ======================================

  const loadInteractions = async (documentId) => {
    try {
      const commentsResponse =
        await getDocumentComments(documentId);

      const commentsData =
        commentsResponse?.data?.comments ||
        commentsResponse?.comments ||
        commentsResponse?.data ||
        [];

      setComments(
        Array.isArray(commentsData)
          ? commentsData
          : []
      );
    } catch {
      setComments([]);
    }

    try {
      const countResponse =
        await getLikeCount(documentId);

      const count =
        countResponse?.data?.count ??
        countResponse?.count ??
        0;

      setLikeCount(count);
    } catch {
      setLikeCount(0);
    }

    if (!isAuthenticated) {
      return;
    }

    try {
      const likeResponse =
        await checkLikeStatus(documentId);

      setLiked(
        Boolean(
          likeResponse?.data?.liked ??
          likeResponse?.liked
        )
      );
    } catch {
      setLiked(false);
    }

    try {
      const bookmarkResponse =
        await checkBookmarkStatus(documentId);

      setBookmarked(
        Boolean(
          bookmarkResponse?.data?.bookmarked ??
          bookmarkResponse?.bookmarked
        )
      );
    } catch {
      setBookmarked(false);
    }
  };


// ======================================
// LIKE
// ======================================

  const handleLike = async () => {
    if (!isAuthenticated) {
      return;
    }

    if (!document?._id || actionLoading) {
      return;
    }

    setActionLoading(true);

    try {
      if (liked) {
        await unlikeDocument(document._id);

        setLiked(false);

        setLikeCount((count) =>
          Math.max(0, count - 1)
        );
      } else {
        await likeDocument(document._id);

        setLiked(true);

        setLikeCount((count) =>
          count + 1
        );
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


// ======================================
// BOOKMARK
// ======================================

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      return;
    }

    if (!document?._id || actionLoading) {
      return;
    }

    setActionLoading(true);

    try {
      if (bookmarked) {
        await removeBookmark(document._id);
        setBookmarked(false);
      } else {
        await addBookmark(document._id);
        setBookmarked(true);
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


// ======================================
// DOWNLOAD
// ======================================

  const handleDownload = async () => {
    if (!document?._id) {
      return;
    }

    try {
      const response =
        await downloadDocument(document._id);

      const blob = new Blob(
        [response.data],
        {
          type:
            response.headers?.["content-type"] ||
            "application/octet-stream",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        window.document.createElement("a");

      link.href = url;

      link.download =
        document.title ||
        "document";

      window.document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to download document."
      );
    }
  };


// ======================================
// ADD COMMENT
// ======================================

  const handleAddComment = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      return;
    }

    if (!comment.trim()) {
      setCommentError(
        "Comment cannot be empty."
      );
      return;
    }

    setCommentError("");

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
          newComment,
          ...previous,
        ]);
      } else {
        const commentsResponse =
          await getDocumentComments(
            document._id
          );

        const commentsData =
          commentsResponse?.data?.comments ||
          commentsResponse?.comments ||
          commentsResponse?.data ||
          [];

        setComments(
          Array.isArray(commentsData)
            ? commentsData
            : []
        );
      }

      setComment("");

    } catch (err) {
      setCommentError(
        err?.response?.data?.message ||
        "Unable to add comment."
      );
    }
  };


// ======================================
// DELETE COMMENT
// ======================================

  const handleDeleteComment = async (
    commentId
  ) => {
    try {
      await deleteComment(commentId);

      setComments((previous) =>
        previous.filter(
          (item) => item._id !== commentId
        )
      );
    } catch (err) {
      setCommentError(
        err?.response?.data?.message ||
        "Unable to delete comment."
      );
    }
  };


// ======================================
// LOADING
// ======================================

  if (loading) {
    return (
      <main className="document-details-page">
        <div className="container">
          <div className="loading-container">
            <p>Loading document...</p>
          </div>
        </div>
      </main>
    );
  }


// ======================================
// ERROR
// ======================================

  if (error && !document) {
    return (
      <main className="document-details-page">
        <div className="container">

          <div className="alert alert-error">
            {error}
          </div>

          <Link
            to="/documents"
            className="btn btn-secondary"
          >
            ← Back to Documents
          </Link>

        </div>
      </main>
    );
  }


// ======================================
// PAGE
// ======================================

  return (
    <main className="document-details-page">

      <div className="container">

        {/* BACK */}

        <Link
          to="/documents"
          className="back-link"
        >
          ← Back to Documents
        </Link>


        {/* ERROR */}

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}


        {/* ================================= */}
        {/* DOCUMENT                           */}
        {/* ================================= */}

        <article className="document-details-card">

          <div className="document-details-header">

            <div>

              <span className="document-details-type">
                {document?.fileType?.toUpperCase() ||
                  "DOCUMENT"}
              </span>

              <h1>
                {document?.title}
              </h1>

              <p className="document-details-author">
                By {document?.author}
              </p>

            </div>

            <span className="document-category">
              {document?.category}
            </span>

          </div>


          {/* DESCRIPTION */}

          <div className="document-details-body">

            <h2>
              About this document
            </h2>

            <p>
              {document?.description}
            </p>


            {/* TAGS */}

            {document?.tags?.length > 0 && (
              <div className="document-tags">

                {document.tags.map((tag) => (
                  <span
                    key={tag}
                    className="document-tag"
                  >
                    #{tag}
                  </span>
                ))}

              </div>
            )}

          </div>


          {/* ACTIONS */}

          <div className="document-actions">

            <button
              type="button"
              className={`btn ${
                liked
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={handleLike}
              disabled={
                !isAuthenticated ||
                actionLoading
              }
            >
              {liked ? "♥ Liked" : "♡ Like"}

              {" "}

              ({likeCount})
            </button>


            <button
              type="button"
              className={`btn ${
                bookmarked
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={handleBookmark}
              disabled={
                !isAuthenticated ||
                actionLoading
              }
            >
              {bookmarked
                ? "★ Saved"
                : "☆ Bookmark"}
            </button>


            <button
              type="button"
              className="btn btn-primary"
              onClick={handleDownload}
            >
              ↓ Download
            </button>

          </div>


          {/* META */}

          <div className="document-meta">

            <span>
              👁 {document?.views || 0} views
            </span>

            <span>
              ↓ {document?.downloads || 0} downloads
            </span>

            <span>
              Language:{" "}
              {document?.language || "English"}
            </span>

          </div>

        </article>


        {/* ================================= */}
        {/* COMMENTS                           */}
        {/* ================================= */}

        <section className="comments-section">

          <div className="section-heading">

            <div>
              <span className="page-eyebrow">
                COMMUNITY
              </span>

              <h2>
                Comments
              </h2>
            </div>

            <span className="document-count">
              {comments.length}
            </span>

          </div>


          {/* ADD COMMENT */}

          {isAuthenticated ? (

            <form
              className="comment-form"
              onSubmit={handleAddComment}
            >

              <textarea
                className="form-input"
                placeholder="Share your thoughts..."
                value={comment}
                onChange={(event) =>
                  setComment(event.target.value)
                }
                rows={4}
              />

              {commentError && (
                <div className="alert alert-error">
                  {commentError}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
              >
                Post Comment
              </button>

            </form>

          ) : (

            <div className="login-prompt">

              <p>
                Sign in to like, bookmark and comment
                on documents.
              </p>

              <Link
                to="/login"
                className="btn btn-primary"
              >
                Sign In
              </Link>

            </div>

          )}


          {/* COMMENTS LIST */}

          <div className="comments-list">

            {comments.length === 0 ? (

              <div className="empty-state">

                <h3>
                  No comments yet
                </h3>

                <p>
                  Be the first to share your thoughts.
                </p>

              </div>

            ) : (

              comments.map((item) => {

                const commentUser =
                  item.user ||
                  item.author ||
                  {};

                const commentUserId =
                  commentUser?._id ||
                  item.userId;

                const isOwner =
                  user?._id &&
                  commentUserId &&
                  String(user._id) ===
                    String(commentUserId);

                return (
                  <article
                    className="comment-card"
                    key={item._id}
                  >

                    <div className="comment-header">

                      <strong>
                        {commentUser?.username ||
                          commentUser?.fullname ||
                          item.author ||
                          "User"}
                      </strong>

                      {item.createdAt && (
                        <span>
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </span>
                      )}

                    </div>

                    <p>
                      {item.content}
                    </p>

                    {isOwner && (
                      <button
                        type="button"
                        className="comment-delete"
                        onClick={() =>
                          handleDeleteComment(
                            item._id
                          )
                        }
                      >
                        Delete
                      </button>
                    )}

                  </article>
                );
              })

            )}

          </div>

        </section>

      </div>

    </main>
  );
};


export default DocumentDetails;