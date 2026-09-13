import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getAllDocuments } from "../../services/document.service.js";

const SearchDocuments = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);

  const category = searchParams.get("category") || "";

  // ==========================================
  // LOAD DOCUMENTS
  // ==========================================

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

  // ==========================================
  // LOAD WHEN FILTERS CHANGE
  // ==========================================

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

  // ==========================================
  // SEARCH
  // ==========================================

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

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");
    setSearchParams({});
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* =====================================================
          HERO / SEARCH
      ===================================================== */}

      <section className="w-full px-6 pb-12 pt-14 sm:px-10 md:px-14 lg:px-20 xl:px-24 md:pb-14 md:pt-20">

        <div className="w-full">

          <span className="page-eyebrow">
            DocYard Archive
          </span>

        {/*   <div className="mt-5 w-full">

            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[80px]">
              Browse the archive.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft md:text-lg">
              Explore documents shared by the DocYard
              community and discover useful knowledge
              in one place.
            </p>

          </div>
 */}

          {/* =================================================
              STRETCHED SEARCH
          ================================================= */}

          <form
            onSubmit={handleSearch}
            className="mt-10 flex w-full items-stretch gap-3"
          >

            <div className="flex-1">

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
                className="h-13 w-full rounded-md border border-line bg-paper-raised px-5 text-base text-ink outline-none transition placeholder:text-ink-faint focus:border-blue focus:ring-2 focus:ring-blue/10"
              />

            </div>


            <button
              type="submit"
              className="h-13 shrink-0 rounded-md bg-[#0A3A63] px-8 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:bg-[#0f3152] active:translate-y-0"
            >
              Search
            </button>

          </form>

        </div>

      </section>


      {/* =====================================================
          DOCUMENT CONTENT
      ===================================================== */}

      <section className="w-full px-6 pb-24 sm:px-10 md:px-14 lg:px-20 xl:px-24">

        <div className="w-full">


          {/* =================================================
              RESULTS BAR
          ================================================= */}

          <div className="flex items-center justify-between gap-4 pb-6">

            <p className="text-sm font-medium text-ink-soft md:text-base">
              {loading
                ? "Loading documents..."
                : `${documents.length} ${
                    documents.length === 1
                      ? "document"
                      : "documents"
                  } found`}
            </p>


            {(search || category) && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-10 items-center rounded-md border border-line bg-paper px-4 text-sm font-medium text-ink-soft transition hover:border-ink hover:bg-paper-raised hover:text-ink"
              >
                Clear filters
              </button>
            )}

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700"
              role="alert"
            >
              {error}
            </div>
          )}


          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="grid w-full gap-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-full rounded-xl border border-line bg-paper-raised p-6 md:p-7"
                >

                  <div className="grid gap-5 md:grid-cols-[80px_minmax(0,1fr)_160px]">

                    <div className="h-16 w-16 animate-pulse rounded-md bg-paper" />

                    <div>

                      <div className="h-3 w-28 animate-pulse rounded bg-paper" />

                      <div className="mt-4 h-8 max-w-lg animate-pulse rounded bg-paper" />

                      <div className="mt-3 h-4 max-w-3xl animate-pulse rounded bg-paper" />

                    </div>

                    <div className="h-11 w-full animate-pulse rounded-md bg-paper md:w-36" />

                  </div>

                </div>
              ))}

            </div>
          )}


          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            !error &&
            documents.length === 0 && (
              <div className="w-full rounded-xl border border-line bg-paper-raised px-6 py-20 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper text-xl text-ink-soft">
                  —
                </div>

                <h2 className="mt-5 font-display text-3xl font-semibold">
                  Nothing found.
                </h2>

                <p className="mx-auto mt-3 max-w-md text-base leading-7 text-ink-soft">
                  Try a different search term or clear
                  your filters to view all documents.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-7 inline-flex h-11 items-center rounded-md bg-blue px-6 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:bg-[#0f3152]"
                >
                  View all documents
                  <span className="ml-2">
                    →
                  </span>
                </button>

              </div>
            )}


          {/* =================================================
              DOCUMENT LIST
          ================================================= */}

          {!loading &&
            documents.length > 0 && (
              <div className="grid w-full gap-4">

                {documents.map((document) => {

                  const author =
                    document.author?.username ||
                    document.author?.name ||
                    document.author ||
                    "Unknown contributor";

                  const documentPath =
                    `/documents/${
                      document.slug ||
                      document._id
                    }`;

                  return (
                    <article
                      key={document._id}
                      className="group w-full rounded-xl border border-line bg-paper-raised p-6 transition-all duration-200 hover:-translate-y-[2px] hover:border-ink/30 hover:bg-white hover:shadow-sm md:p-7 lg:p-8"
                    >

                      <div className="grid gap-6 md:grid-cols-[80px_minmax(0,1fr)_180px] md:items-center">


                        {/* =================================
                            FILE TYPE
                        ================================= */}

                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-ink text-paper">

                          <span className="font-mono text-xs font-medium uppercase">
                            {(
                              document.fileType ||
                              "DOC"
                            ).replace(".", "")}
                          </span>

                        </div>


                        {/* =================================
                            DOCUMENT INFORMATION
                        ================================= */}

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">

                            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-blue">
                              {document.category ||
                                "Archive"}
                            </span>

                            <span className="text-sm text-ink-faint">
                              {formatDate(
                                document.createdAt
                              )}
                            </span>

                          </div>


                          <h2 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[-0.015em] sm:text-3xl">

                            <Link
                              to={documentPath}
                              className="transition-colors hover:text-blue"
                            >
                              {document.title ||
                                "Untitled document"}
                            </Link>

                          </h2>


                          <p className="mt-3 max-w-4xl text-base leading-7 text-ink-soft">
                            {document.description ||
                              "No description available."}
                          </p>


                          {/* =================================
                              METADATA
                          ================================= */}

                          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-faint">

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


                            {document.views !==
                              undefined && (
                              <span>
                                {document.views} views
                              </span>
                            )}

                          </div>

                        </div>


                        {/* =================================
                            READ BUTTON
                        ================================= */}

                        <div className="flex md:justify-end">

                          <Link
                            to={documentPath}
                            className="inline-flex h-11 w-full items-center justify-center rounded-md border border-ink bg-paper px-6 text-sm font-semibold text-ink transition-all duration-200 hover:bg-ink hover:text-paper sm:w-auto"
                          >
                            READ
                          </Link>

                        </div>

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

export default SearchDocuments;