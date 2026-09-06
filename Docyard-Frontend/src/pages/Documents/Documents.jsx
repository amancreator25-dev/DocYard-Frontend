import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getAllDocuments } from "../services/document.js";

const Documents = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const initialSearch =
    searchParams.get("search") || "";

  const [search, setSearch] =
    useState(initialSearch);

  const category =
    searchParams.get("category") || "";

  const loadDocuments = async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      const response =
        await getAllDocuments(params);

      const data =
        response?.data?.documents ||
        response?.documents ||
        response?.data ||
        [];

      setDocuments(
        Array.isArray(data) ? data : []
      );
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

  const clearFilters = () => {
    setSearch("");
    setSearchParams({});
  };

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

      {/* ================================= */}
      {/* HEADER                            */}
      {/* ================================= */}

      <section className="border-b border-line px-6 py-14 md:px-12 md:py-20">

        <div className="mx-auto max-w-[1180px]">

          <span className="page-eyebrow">
            THE DOCYARD ARCHIVE
          </span>

          <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            Browse the archive.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-soft">
            Explore documents shared by the
            DocYard community.
          </p>

          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search documents..."
              className="form-input flex-1"
            />

            <button
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button>

          </form>

        </div>

      </section>


      {/* ================================= */}
      {/* CONTENT                            */}
      {/* ================================= */}

      <section className="px-6 py-10 md:px-12 md:py-14">

        <div className="mx-auto max-w-[1180px]">

          {/* TOP BAR */}

          <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-center">

            <div className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
              {loading
                ? "Loading archive..."
                : `${documents.length} ${
                    documents.length === 1
                      ? "document"
                      : "documents"
                  }`}
            </div>

            {(search || category) && (
              <button
                type="button"
                onClick={clearFilters}
                className="self-start font-mono text-[10px] uppercase tracking-wide text-blue hover:text-ink"
              >
                Clear filters ×
              </button>
            )}

          </div>


          {/* ERROR */}

          {error && (
            <div className="mt-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft">
              {error}
            </div>
          )}


          {/* LOADING */}

          {loading && (
            <div className="divide-y divide-line">

              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="grid gap-5 py-7 md:grid-cols-[72px_minmax(0,1fr)]"
                  >

                    <div className="h-[78px] w-[62px] bg-paper-raised" />

                    <div>

                      <div className="h-3 w-24 bg-paper-raised" />

                      <div className="mt-4 h-7 max-w-xl bg-paper-raised" />

                      <div className="mt-3 h-3 max-w-2xl bg-paper-raised" />

                    </div>

                  </div>
                )
              )}

            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            documents.length === 0 && (
              <div className="py-24 text-center">

                <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                  ARCHIVE
                </span>

                <h2 className="mt-3 font-display text-3xl font-semibold">
                  Nothing found.
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
                  Try a different search term or
                  clear your filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn btn-primary mt-7"
                >
                  View all documents
                </button>

              </div>
            )}


          {/* DOCUMENTS */}

          {!loading &&
            documents.length > 0 && (
              <div className="divide-y divide-line">

                {documents.map((document) => {

                  const author =
                    document.author?.username ||
                    document.author?.name ||
                    document.author ||
                    "Unknown contributor";

                  return (
                    <article
                      key={document._id}
                      className="group grid gap-6 py-8 md:grid-cols-[72px_minmax(0,1fr)_auto]"
                    >

                      {/* FILE MARK */}

                      <div className="flex h-[78px] w-[62px] items-center justify-center bg-ink text-paper">

                        <span className="font-mono text-[9px] uppercase">
                          {(
                            document.fileType ||
                            "DOC"
                          ).replace(".", "")}
                        </span>

                      </div>


                      {/* INFORMATION */}

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-3">

                          <span className="font-mono text-[10px] uppercase tracking-wide text-blue">
                            {document.category ||
                              "Archive"}
                          </span>

                          <span className="font-mono text-[10px] text-ink-faint">
                            {formatDate(
                              document.createdAt
                            )}
                          </span>

                        </div>

                        <h2 className="mt-2 font-display text-2xl font-semibold leading-tight md:text-3xl">

                          <Link
                            to={`/documents/${
                              document.slug ||
                              document._id
                            }`}
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


                      {/* VIEW */}

                      <div className="flex items-center md:self-center">

                        <Link
                          to={`/documents/${
                            document.slug ||
                            document._id
                          }`}
                          className="btn btn-ghost"
                        >
                          Read →
                        </Link>

                      </div>

                    </article>
                  );
                })}

              </div>
            )}

        </div>

      </section>

    </main>
  );
};

export default Documents;