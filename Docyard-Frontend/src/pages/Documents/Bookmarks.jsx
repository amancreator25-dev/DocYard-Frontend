import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getMyBookmarks,
  removeBookmark,
} from "../../services/bookmark.service.js";

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

          return document._id !== documentId;
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
    <main className="min-h-screen bg-paper text-ink">

      {/* ======================================
          HEADER
      ====================================== */}

      <section className="w-full px-6 pb-10 pt-10 sm:px-10 md:px-14 md:pb-14 md:pt-14 lg:px-20 xl:px-24">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <span className="page-eyebrow">
              YOUR LIBRARY
            </span>

            <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.98] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[76px]">
              Bookmarks
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft md:text-lg">
              Documents you've saved for later.
              Keep useful research, references, and
              discoveries close at hand.
            </p>

          </div>


          <Link
            to="/documents"
            className="inline-flex h-12 w-fit items-center justify-center rounded-lg border border-blue bg-blue px-6 text-sm font-semibold text-white shadow-sm transition-all hover:border-ink hover:bg-ink"
          >
            Browse archive →
          </Link>

        </div>

      </section>


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24">

          <div className="rounded-xl border border-line-strong bg-paper-raised px-5 py-4 text-sm font-medium text-ink md:px-6 md:py-5">
            {error}
          </div>

        </section>
      )}


      {/* ======================================
          CONTENT
      ====================================== */}

      <section className="w-full px-6 pb-16 pt-6 sm:px-10 md:px-14 md:pb-24 md:pt-8 lg:px-20 xl:px-24">

        {/* ==================================
            COUNT / TOOLBAR
        ================================== */}

        {!loading && (
          <div className="mb-8 flex flex-col gap-5 rounded-xl border border-line bg-paper-raised px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div>

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                SAVED DOCUMENTS
              </span>

              <p className="mt-2 font-display text-2xl font-semibold">
                {bookmarks.length}{" "}
                {bookmarks.length === 1
                  ? "document"
                  : "documents"}
              </p>

            </div>


            <Link
              to="/documents"
              className="inline-flex h-10 w-fit items-center justify-center rounded-lg border border-line-strong bg-white px-5 text-xs font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
            >
              Find more documents
            </Link>

          </div>
        )}


        {/* ==================================
            LOADING
        ================================== */}

        {loading && (
          <div className="grid gap-5">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="grid gap-6 rounded-2xl border border-line bg-white p-6 sm:p-7 md:grid-cols-[80px_minmax(0,1fr)_180px] md:p-8"
              >

                <div className="h-[88px] w-[68px] bg-paper-raised" />

                <div>

                  <div className="h-3 w-28 bg-paper-raised" />

                  <div className="mt-5 h-8 w-3/4 bg-paper-raised" />

                  <div className="mt-4 h-4 w-full max-w-2xl bg-paper-raised" />

                  <div className="mt-3 h-4 w-2/3 max-w-xl bg-paper-raised" />

                </div>


                <div className="h-11 w-full bg-paper-raised md:self-center" />

              </div>
            ))}

          </div>
        )}


        {/* ==================================
            EMPTY STATE
        ================================== */}

        {!loading && bookmarks.length === 0 && (
          <div className="rounded-2xl border border-line bg-white px-6 py-20 text-center sm:px-10 md:py-28">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-line bg-paper-raised font-display text-3xl text-blue">
              +
            </div>

            <span className="mt-7 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
              SAVED DOCUMENTS
            </span>

            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              Your shelf is empty.
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-ink-soft md:text-base">
              Save documents while browsing the archive
              and they'll appear here for quick access later.
            </p>

            <Link
              to="/documents"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-lg border border-blue bg-blue px-7 text-sm font-semibold text-white shadow-sm transition-all hover:border-ink hover:bg-ink"
            >
              Browse the archive →
            </Link>

          </div>
        )}


        {/* ==================================
            BOOKMARK LIST
        ================================== */}

        {!loading && bookmarks.length > 0 && (
          <section className="grid gap-5">

            {bookmarks.map((bookmark) => {

              const document =
                getDocument(bookmark);

              if (!document?._id) {
                return null;
              }

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
                  className="group grid gap-6 rounded-2xl border border-line bg-white p-6 transition-all hover:border-line-strong hover:bg-white hover:shadow-sm sm:p-7 md:grid-cols-[80px_minmax(0,1fr)_220px] md:p-8"
                >

                  {/* ==================================
                      DOCUMENT MARK
                  ================================== */}

                  <div className="flex h-[88px] w-[68px] items-center justify-center rounded-lg bg-ink text-paper shadow-sm">

                    <span className="font-mono text-xs font-semibold uppercase tracking-wide">
                      {(
                        document.fileType ||
                        "DOC"
                      ).replace(".", "")}
                    </span>

                  </div>


                  {/* ==================================
                      DOCUMENT INFO
                  ================================== */}

                  <div className="min-w-0">

                    {/* CATEGORY + DATE */}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">

                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-blue">
                        {document.category ||
                          "Archive"}
                      </span>

                      {document.createdAt && (
                        <span className="font-mono text-xs text-ink-faint">
                          Saved{" "}
                          {formatDate(
                            document.createdAt
                          )}
                        </span>
                      )}

                    </div>


                    {/* TITLE */}

                    <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl">

                      <Link
                        to={`/documents/${slug}`}
                        className="transition-colors group-hover:text-blue"
                      >
                        {document.title ||
                          "Untitled document"}
                      </Link>

                    </h2>


                    {/* DESCRIPTION */}

                    <p className="mt-3 line-clamp-2 max-w-4xl text-sm leading-6 text-ink-soft md:text-base">
                      {document.description ||
                        "No description available."}
                    </p>


                    {/* METADATA */}

                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">

                      <span className="text-sm text-ink-soft">
                        <span className="text-ink-faint">
                          By{" "}
                        </span>
                        {author}
                      </span>

                      {document.language && (
                        <span className="text-sm text-ink-soft">
                          <span className="text-ink-faint">
                            Language{" "}
                          </span>
                          {document.language}
                        </span>
                      )}

                      {document.views !==
                        undefined && (
                        <span className="text-sm text-ink-soft">
                          <span className="text-ink-faint">
                            Views{" "}
                          </span>
                          {document.views}
                        </span>
                      )}

                    </div>

                  </div>


                  {/* ==================================
                      ACTIONS
                  ================================== */}

                  <div className="flex flex-col justify-center gap-3 sm:flex-row md:flex-col">

                    <Link
                      to={`/documents/${slug}`}
                      className="inline-flex h-11 items-center justify-center rounded-lg border border-blue bg-blue px-5 text-sm font-semibold text-white transition-all hover:border-ink hover:bg-ink"
                    >
                      Read document →
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
                      className="inline-flex h-11 items-center justify-center rounded-lg border border-line-strong bg-paper px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft transition-all hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {removingId ===
                      document._id
                        ? "Removing..."
                        : "Remove bookmark"}
                    </button>

                  </div>

                </article>
              );
            })}

          </section>
        )}

      </section>

    </main>
  );
};

export default Bookmarks;