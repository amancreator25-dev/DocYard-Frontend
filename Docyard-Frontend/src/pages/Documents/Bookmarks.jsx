import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getMyBookmarks,
  removeBookmark,
} from "../services/bookmark.js";

import useAuth from "../hooks/useAuth.js";

const Bookmarks = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  // ======================================
  // LOAD BOOKMARKS
  // ======================================

  useEffect(() => {
    const loadBookmarks = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getMyBookmarks();

        const data =
          response?.data?.bookmarks ||
          response?.bookmarks ||
          response?.data ||
          [];

        setBookmarks(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load your bookmarks."
        );
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadBookmarks();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // ======================================
  // REMOVE BOOKMARK
  // ======================================

  const handleRemove = async (documentId) => {
    setRemovingId(documentId);
    setError("");

    try {
      await removeBookmark(documentId);

      setBookmarks((previous) =>
        previous.filter((item) => {
          const document =
            item.document || item;

          return document._id !== documentId;
        })
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to remove bookmark."
      );
    } finally {
      setRemovingId(null);
    }
  };

  // ======================================
  // LOGIN REQUIRED
  // ======================================

  if (!isAuthenticated) {
    return (
      <main className="bookmarks-page">
        <div className="container">
          <div className="bookmarks-empty">
            <span className="page-eyebrow">
              DOCYARD
            </span>

            <h1>Saved documents</h1>

            <p>
              Sign in to save and access documents
              you want to return to later.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ======================================
  // PAGE
  // ======================================

  return (
    <main className="bookmarks-page">
      <div className="container">

        {/* HEADER */}

        <header className="bookmarks-header">
          <div>
            <span className="page-eyebrow">
              YOUR LIBRARY
            </span>

            <h1>Bookmarks</h1>

            <p>
              Documents you've saved for later.
            </p>
          </div>

          <Link
            to="/documents"
            className="btn btn-ghost"
          >
            Browse documents
          </Link>
        </header>

        {/* ERROR */}

        {error && (
          <div className="bookmarks-alert">
            {error}
          </div>
        )}

        {/* COUNT */}

        {!loading && bookmarks.length > 0 && (
          <div className="bookmarks-count">
            {bookmarks.length}{" "}
            {bookmarks.length === 1
              ? "saved document"
              : "saved documents"}
          </div>
        )}

        {/* LOADING */}

        {loading && (
          <div className="bookmarks-loading">
            <span className="loading-line" />
            <span className="loading-line short" />
            <span className="loading-line" />
          </div>
        )}

        {/* EMPTY */}

        {!loading && bookmarks.length === 0 && (
          <div className="bookmarks-empty">

            <div className="bookmark-empty-icon">
              ♧
            </div>

            <h2>
              No bookmarks yet.
            </h2>

            <p>
              When you find a document worth
              returning to, save it here.
            </p>

            <Link
              to="/documents"
              className="btn btn-primary"
            >
              Explore documents
            </Link>

          </div>
        )}

        {/* BOOKMARK LIST */}

        {!loading && bookmarks.length > 0 && (
          <section className="bookmark-list">

            {bookmarks.map((item) => {
              const document =
                item.document || item;

              const documentId =
                document._id;

              return (
                <article
                  className="bookmark-card"
                  key={documentId}
                >

                  {/* DOCUMENT TYPE */}

                  <div className="bookmark-type">
                    <span>
                      {(
                        document.fileType ||
                        "DOC"
                      ).toUpperCase()}
                    </span>
                  </div>

                  {/* CONTENT */}

                  <div className="bookmark-content">

                    <div className="bookmark-topline">

                      <span className="bookmark-category">
                        {document.category ||
                          "Archive"}
                      </span>

                      {document.createdAt && (
                        <span className="bookmark-date">
                          {new Date(
                            document.createdAt
                          ).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      )}

                    </div>

                    <h2>
                      <Link
                        to={`/documents/${document.slug}`}
                      >
                        {document.title}
                      </Link>
                    </h2>

                    <p className="bookmark-description">
                      {document.description ||
                        "No description available."}
                    </p>

                    <div className="bookmark-meta">

                      {document.author && (
                        <span>
                          By {document.author}
                        </span>
                      )}

                      {document.language && (
                        <span>
                          {document.language}
                        </span>
                      )}

                      {document.views !== undefined && (
                        <span>
                          {document.views} views
                        </span>
                      )}

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="bookmark-actions">

                    <Link
                      to={`/documents/${document.slug}`}
                      className="btn btn-primary"
                    >
                      Read
                    </Link>

                    <button
                      type="button"
                      className="bookmark-remove"
                      onClick={() =>
                        handleRemove(documentId)
                      }
                      disabled={
                        removingId === documentId
                      }
                    >
                      {removingId === documentId
                        ? "Removing..."
                        : "Remove"}
                    </button>

                  </div>

                </article>
              );
            })}

          </section>
        )}

      </div>
    </main>
  );
};

export default Bookmarks;