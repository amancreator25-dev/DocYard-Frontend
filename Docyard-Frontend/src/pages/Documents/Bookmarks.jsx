import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getMyBookmarks,
  removeBookmark,
} from "../services/bookmark.service.js";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

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

        setBookmarks(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load your bookmarks."
        );
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  const handleRemove = async (documentId) => {
    if (removingId) return;

    setRemovingId(documentId);
    setError("");

    try {
      await removeBookmark(documentId);

      setBookmarks((previous) =>
        previous.filter((item) => {
          const document =
            item.document || item;

          return (
            document._id !== documentId
          );
        })
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to remove bookmark."
      );
    } finally {
      setRemovingId(null);
    }
  };

  const getDocument = (bookmark) =>
    bookmark?.document || bookmark;

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  return (
    <main className="min-h-screen bg-paper px-6 py-16 text-ink md:px-12">

      <div className="mx-auto max-w-[1180px]">

        {/* HEADER */}

        <header className="border-b border-line pb-8">

          <span className="page-eyebrow">
            YOUR LIBRARY
          </span>

          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
            Bookmarks
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">
            Documents you've saved for later.
          </p>

        </header>


        {/* ERROR */}

        {error && (
          <div className="mt-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft">
            {error}
          </div>
        )}


        {/* COUNT */}

        {!loading && (
          <div className="border-b border-line py-5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
            {bookmarks.length}{" "}
            {bookmarks.length === 1
              ? "saved document"
              : "saved documents"}
          </div>
        )}


        {/* LOADING */}

        {loading && (
          <div className="divide-y divide-line">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="grid gap-6 py-8 md:grid-cols-[72px_minmax(0,1fr)]"
              >

                <div className="h-[78px] w-[62px] bg-paper-raised" />

                <div>

                  <div className="h-3 w-24 bg-paper-raised" />

                  <div className="mt-4 h-7 max-w-xl bg-paper-raised" />

                  <div className="mt-3 h-3 max-w-2xl bg-paper-raised" />

                </div>

              </div>
            ))}

          </div>
        )}


        {/* EMPTY */}

        {!loading &&
          bookmarks.length === 0 && (
            <div className="py-24 text-center">

              <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                SAVED DOCUMENTS
              </span>

              <h2 className="mt-3 font-display text-3xl font-semibold">
                Your shelf is empty.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
                Save documents while browsing
                the archive and they'll appear here.
              </p>

              <Link
                to="/documents"
                className="btn btn-primary mt-7"
              >
                Browse the archive
              </Link>

            </div>
          )}


        {/* BOOKMARK LIST */}

        {!loading &&
          bookmarks.length > 0 && (
            <section className="divide-y divide-line">

              {bookmarks.map((bookmark) => {

                const document =
                  getDocument(bookmark);

                if (!document?._id) return null;

                const slug =
                  document.slug ||
                  document._id;

                const author =
                  document.author?.username ||
                  document.author?.name ||
                  document.author ||
                  "Unknown contributor";

                return (
                  <article
                    key={
                      bookmark._id ||
                      document._id
                    }
                    className="group grid gap-6 py-8 md:grid-cols-[72px_minmax(0,1fr)_auto]"
                  >

                    {/* DOCUMENT MARK */}

                    <div className="flex h-[78px] w-[62px] items-center justify-center bg-ink text-paper">

                      <span className="font-mono text-[9px] uppercase">
                        {(
                          document.fileType ||
                          "DOC"
                        ).replace(".", "")}
                      </span>

                    </div>


                    {/* DOCUMENT INFO */}

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="font-mono text-[10px] uppercase tracking-wide text-blue">
                          {document.category ||
                            "Archive"}
                        </span>

                        {document.createdAt && (
                          <span className="font-mono text-[10px] text-ink-faint">
                            {formatDate(
                              document.createdAt
                            )}
                          </span>
                        )}

                      </div>


                      <h2 className="mt-2 font-display text-2xl font-semibold leading-tight md:text-3xl">

                        <Link
                          to={`/documents/${slug}`}
                          className="transition-colors group-hover:text-blue"
                        >
                          {document.title ||
                            "Untitled document"}
                        </Link>

                      </h2>


                      <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-ink-soft">
                        {document.description ||
                          "No description available."}
                      </p>


                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] text-ink-faint">

                        <span>
                          By {author}
                        </span>

                        {document.language && (
                          <span>
                            {document.language}
                          </span>
                        )}

                        {document.views !==
                          undefined && (
                          <span>
                            {document.views} views
                          </span>
                        )}

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="flex items-center gap-4 md:self-center">

                      <Link
                        to={`/documents/${slug}`}
                        className="btn btn-primary"
                      >
                        Read →
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(
                            document._id
                          )
                        }
                        disabled={
                          removingId ===
                          document._id
                        }
                        className="font-mono text-[10px] uppercase tracking-wide text-ink-faint transition-colors hover:text-ink disabled:opacity-50"
                      >
                        {removingId ===
                        document._id
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