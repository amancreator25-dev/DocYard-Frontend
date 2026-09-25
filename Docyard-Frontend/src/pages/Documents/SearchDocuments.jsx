import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getAllDocuments } from "../../services/document.service.js";

const SearchDocuments = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialSearch = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [search, setSearch] = useState(initialSearch);

  const extractDocuments = (response) => {
    const data =
      response?.data?.documents ||
      response?.documents ||
      response?.data ||
      [];

    return Array.isArray(data) ? data : [];
  };

  const matchesSearch = (document, query) => {
    if (!query.trim()) return false;

    const value = query.trim().toLowerCase();

    const searchableFields = [
      document.title,
      document.description,
      document.category,
      document.language,
      document.fileType,
      ...(Array.isArray(document.tags) ? document.tags : []),
      document.author?.username,
      document.author?.fullname,
      document.author?.name,
      document.author,
      document.createdBy?.username,
      document.createdBy?.fullname,
      document.createdBy?.name,
    ];

    return searchableFields
      .filter(Boolean)
      .some((field) =>
        String(field).toLowerCase().includes(value)
      );
  };

  const filterDocuments = (documents, query, selectedCategory) => {
    return documents.filter((document) => {
      const searchMatch = query
        ? matchesSearch(document, query)
        : false;

      const categoryMatch = selectedCategory
        ? String(document.category || "").toLowerCase() ===
          selectedCategory.toLowerCase()
        : true;

      return searchMatch && categoryMatch;
    });
  };

  const loadDocuments = async () => {
    const query = initialSearch.trim();

    setError("");

    if (!query) {
      setDocuments([]);
      return;
    }

    setLoading(true);

    try {
      const response = await getAllDocuments({
        search: query,
        ...(category && { category }),
      });

      const data = extractDocuments(response);

      const validResults = filterDocuments(
        data,
        query,
        category
      );

      setDocuments(validResults);
    } catch (err) {
      setDocuments([]);
      setError(
        err?.response?.data?.message ||
          "Unable to search documents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearch(initialSearch);
    loadDocuments();
  }, [initialSearch, category]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      setDocuments([]);
      setSearchParams({});
      return;
    }

    const params = { search: query };

    if (category) {
      params.category = category;
    }

    setSearchParams(params);
  };

  const clearSearch = () => {
    setSearch("");
    setDocuments([]);
    setSearchParams({});
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="w-full px-6 pb-12 pt-14 sm:px-10 md:px-14 md:pb-14 md:pt-20 lg:px-20 xl:px-24">
        <div className="w-full">
          <span className="page-eyebrow">
            DocYard Archive
          </span>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <Link
              to="/documents"
              className="inline-flex h-10 items-center justify-center rounded-md border border-ink px-5 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper"
            >
              All Documents
            </Link>
          </div>

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
              placeholder="Search documents"
              className="h-12 min-w-0 flex-1 rounded-md border border-line bg-paper-raised px-4 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-[#0A3A63] focus:ring-2 focus:ring-[#0A3A63]/10"
            />

            <button
              type="submit"
              className="h-12 rounded-md bg-[#0A3A63] px-7 font-mono text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#082F50]"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="w-full px-6 pb-24 sm:px-10 md:px-14 lg:px-20 xl:px-24">
        {!initialSearch.trim() && !loading && (
          <div className="w-full rounded-xl border border-line bg-paper-raised px-6 py-20 text-center">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              Search the archive
            </span>

            <h2 className="mt-3 font-display text-3xl font-semibold">
              Enter a search term.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
              Search by document title, topic, category,
              language, author or keyword.
            </p>
          </div>
        )}

        {loading && (
          <div className="grid w-full gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-full rounded-xl border border-line bg-paper-raised p-6 md:p-7"
              >
                <div className="grid gap-6 md:grid-cols-[80px_minmax(0,1fr)_180px] md:items-center">
                  <div className="h-16 w-16 animate-pulse rounded-md bg-paper" />

                  <div>
                    <div className="h-3 w-28 animate-pulse rounded bg-paper" />
                    <div className="mt-4 h-7 max-w-lg animate-pulse rounded bg-paper" />
                    <div className="mt-3 h-4 max-w-2xl animate-pulse rounded bg-paper" />
                    <div className="mt-5 h-4 w-56 animate-pulse rounded bg-paper" />
                  </div>

                  <div className="h-10 w-full animate-pulse rounded-md bg-paper md:w-28" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div
            className="rounded-md border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          initialSearch.trim() &&
          documents.length === 0 && (
            <div className="w-full rounded-xl border border-line bg-paper-raised px-6 py-20 text-center">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                No results
              </span>

              <h2 className="mt-3 font-display text-3xl font-semibold">
                Nothing found.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
                No documents matched{" "}
                <span className="font-medium text-ink">
                  "{initialSearch}"
                </span>
                . Try another keyword.
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="mt-7 inline-flex h-11 items-center rounded-md bg-[#0A3A63] px-6 font-mono text-[10px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#082F50]"
              >
                Clear Search
              </button>
            </div>
          )}

        {!loading &&
          !error &&
          initialSearch.trim() &&
          documents.length > 0 && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-medium text-ink-soft">
                  {documents.length}{" "}
                  {documents.length === 1
                    ? "document"
                    : "documents"}{" "}
                  found
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="rounded-md border border-line px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-soft transition hover:border-ink hover:text-ink"
                >
                  Clear
                </button>
              </div>

              <div className="grid w-full gap-4">
                {documents.map((document) => {
                  const author =
                    document.author?.username ||
                    document.author?.fullname ||
                    document.author?.name ||
                    document.author ||
                    document.createdBy?.username ||
                    document.createdBy?.fullname ||
                    document.createdBy?.name ||
                    "Unknown contributor";

                  const documentPath = `/documents/${
                    document.slug || document._id
                  }`;

                  return (
                    <article
                      key={document._id}
                      className="group w-full rounded-xl border border-line bg-paper-raised p-6 transition-all duration-200 hover:-translate-y-[2px] hover:border-ink/30 hover:bg-white hover:shadow-sm md:p-7 lg:p-8"
                    >
                      <div className="grid gap-6 md:grid-cols-[80px_minmax(0,1fr)_180px] md:items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-ink text-paper">
                          <span className="font-mono text-xs font-medium uppercase">
                            {(document.fileType || "DOC").replace(
                              ".",
                              ""
                            )}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0A3A63]">
                              {document.category || "Archive"}
                            </span>

                            <span className="text-sm text-ink-faint">
                              {formatDate(document.createdAt)}
                            </span>
                          </div>

                          <h2 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[-0.015em] sm:text-3xl">
                            <Link
                              to={documentPath}
                              className="transition-colors hover:text-[#0A3A63]"
                            >
                              {document.title || "Untitled document"}
                            </Link>
                          </h2>

                          <p className="mt-3 line-clamp-2 max-w-4xl text-sm leading-6 text-ink-soft">
                            {document.description ||
                              "No description available."}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-ink-faint">
                            <span>
                              By{" "}
                              <span className="font-medium text-ink-soft">
                                {author}
                              </span>
                            </span>

                            {document.language && (
                              <span>{document.language}</span>
                            )}

                            {document.views !== undefined && (
                              <span>
                                {document.views} views
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="md:text-right">
                          <Link
                            to={documentPath}
                            className="inline-flex h-10 w-full items-center justify-center rounded-md border border-ink px-5 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-paper sm:w-auto"
                          >
                            Read
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
      </section>
    </main>
  );
};

export default SearchDocuments;