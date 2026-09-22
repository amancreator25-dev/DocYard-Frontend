import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getAllDocuments } from "../../services/document.service.js";

const SearchDocuments = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const initialSearch = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [search, setSearch] = useState(initialSearch);

  // ======================================
  // LOAD DOCUMENTS
  // ======================================

  const loadDocuments = async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      const response = await getAllDocuments(params);

      const data =
        response?.data?.documents ||
        response?.documents ||
        response?.data ||
        [];

      setDocuments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load documents."
      );

      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // LOAD WHEN FILTERS CHANGE
  // ======================================

  useEffect(() => {
    const params = {};

    if (initialSearch.trim()) {
      params.search = initialSearch.trim();
    }

    if (category) {
      params.category = category;
    }

    loadDocuments(params);
  }, [initialSearch, category]);

  // ======================================
  // SEARCH
  // ======================================

  const handleSearch = (event) => {
    event.preventDefault();

    const params = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (category) {
      params.category = category;
    }

    setSearchParams(params);
  };

  // ======================================
  // CLEAR FILTERS
  // ======================================

  const clearFilters = () => {
    setSearch("");
    setSearchParams({});
  };

  // ======================================
  // FORMAT DATE
  // ======================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ======================================
  // RENDER
  // ======================================

  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* ==================================
          SEARCH HEADER
      ================================== */}

      <section className="border-b border-line">
        <div className="w-full px-6 pb-12 pt-14 sm:px-10 md:px-14 lg:px-20 xl:px-24">

          <div className="max-w-5xl">

            <span className="page-eyebrow">
              DocYard Archive
            </span>

            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl md:text-6xl">
              Search the archive.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
              Find historical documents, research, papers,
              records and other resources preserved in DocYard.
            </p>

            {/* SEARCH */}

            <form
              onSubmit={handleSearch}
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row"
            >
              <label
                htmlFor="document-search"
                className="sr-only"
              >
                Search documents
              </label>

              <input
                id="document-search"
                name="search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by title, topic or keyword"
                className="h-12 min-w-0 flex-1 rounded-md border border-line bg-paper-raised px-4 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-[#0A3A63] focus:ring-2 focus:ring-[#0A3A63]/10"
              />

              <button
                type="submit"
                className="h-12 rounded-md bg-[#0A3A63] px-7 font-mono text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#082F50] sm:w-auto"
              >
                Search
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* ==================================
          RESULTS
      ================================== */}

      <section className="w-full px-6 py-10 sm:px-10 md:px-14 lg:px-20 xl:px-24">

        {/* RESULTS HEADER */}

        <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              Archive results
            </span>

            <p className="mt-2 text-sm text-ink-soft">
              {loading
                ? "Loading documents..."
                : `${documents.length} ${
                    documents.length === 1
                      ? "document"
                      : "documents"
                  } found`}
            </p>
          </div>

          {(search || category) && (
            <button
              type="button"
              onClick={clearFilters}
              className="self-start rounded-md border border-line px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-soft transition hover:border-ink hover:text-ink sm:self-auto"
            >
              Clear filters
            </button>
          )}

        </div>

        {/* ACTIVE FILTERS */}

        {(search || category) && !loading && (
          <div className="flex flex-wrap gap-2 py-5">

            {search && (
              <span className="rounded-md bg-[#0A3A63]/5 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-[#0A3A63]">
                Search: {search}
              </span>
            )}

            {category && (
              <span className="rounded-md bg-[#0A3A63]/5 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-[#0A3A63]">
                Category: {category}
              </span>
            )}

          </div>
        )}

        {/* ERROR */}

        {error && (
          <div
            className="mt-6 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* ==================================
            LOADING
        ================================== */}

        {loading && (
          <div className="mt-6 divide-y divide-line border-y border-line">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="grid gap-5 py-7 md:grid-cols-[72px_minmax(0,1fr)_100px]"
              >
                <div className="h-14 w-14 animate-pulse rounded-md bg-paper-raised" />

                <div>
                  <div className="h-3 w-24 animate-pulse rounded bg-paper-raised" />
                  <div className="mt-3 h-7 max-w-xl animate-pulse rounded bg-paper-raised" />
                  <div className="mt-3 h-4 max-w-2xl animate-pulse rounded bg-paper-raised" />
                </div>

                <div className="h-10 w-24 animate-pulse rounded-md bg-paper-raised" />
              </div>
            ))}

          </div>
        )}

        {/* ==================================
            EMPTY
        ================================== */}

        {!loading &&
          !error &&
          documents.length === 0 && (
            <div className="border-b border-line py-20">

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                No results
              </span>

              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.025em]">
                Nothing found.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-ink-soft">
                Try another keyword or clear your filters
                to browse the complete archive.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-md bg-[#0A3A63] px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#082F50]"
              >
                View all documents
              </button>

            </div>
          )}

        {/* ==================================
            DOCUMENT LIST
        ================================== */}

        {!loading && documents.length > 0 && (
          <div className="divide-y divide-line border-b border-line">

            {documents.map((document) => {
              const author =
                document.author?.username ||
                document.author?.name ||
                document.author ||
                "Unknown contributor";

              const documentPath =
                `/documents/${
                  document.slug || document._id
                }`;

              return (
                <article
                  key={document._id}
                  className="group grid gap-6 py-7 transition-colors hover:bg-paper-raised/60 md:grid-cols-[72px_minmax(0,1fr)_100px] md:items-center"
                >

                  {/* FILE TYPE */}

                  <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-paper-raised text-ink-soft">
                    <span className="font-mono text-[10px] font-semibold uppercase">
                      {(document.fileType || "DOC").replace(
                        ".",
                        ""
                      )}
                    </span>
                  </div>

                  {/* DOCUMENT INFO */}

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">

                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0A3A63]">
                        {document.category || "Archive"}
                      </span>

                      <span className="text-xs text-ink-faint">
                        {formatDate(document.createdAt)}
                      </span>

                    </div>

                    <h2 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">
                      <Link
                        to={documentPath}
                        className="transition-colors hover:text-[#0A3A63]"
                      >
                        {document.title || "Untitled document"}
                      </Link>
                    </h2>

                    <p className="mt-2 line-clamp-2 max-w-4xl text-sm leading-6 text-ink-soft">
                      {document.description ||
                        "No description available."}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-ink-faint">

                      <span>
                        By{" "}
                        <span className="font-medium text-ink-soft">
                          {author}
                        </span>
                      </span>

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

                  {/* ACTION */}

                  <div className="md:text-right">

                    <Link
                      to={documentPath}
                      className="inline-flex h-10 w-full items-center justify-center rounded-md border border-ink px-5 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-paper sm:w-auto"
                    >
                      Read
                    </Link>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </section>

    </main>
  );
};

export default SearchDocuments;