import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { getAllDocuments } from "../../services/document.service.js";

const Document = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);

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
  // GET DOCUMENT DATA
  // ==========================================

  const extractDocuments = (response) => {
    return (
      response?.data?.documents ||
      response?.documents ||
      response?.data ||
      []
    );
  };

  // ==========================================
  // LOAD DOCUMENTS
  // ==========================================

  const loadDocuments = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) {
        setLoading(true);
        setError("");
      } else {
        setLoadingMore(true);
      }

      /*
        We pass page and limit here.

        If your backend supports pagination:
          page=1 -> first 10 documents
          page=2 -> next 10 documents
          page=3 -> next 10 documents

        If your current backend does not support pagination,
        getAllDocuments() will simply return the existing
        document list and the code will stop loading more.
      */

      const response = await getAllDocuments({
        page: pageNumber,
        limit: 10,
      });

      const newDocuments = extractDocuments(response);

      if (!Array.isArray(newDocuments)) {
        setHasMore(false);
        return;
      }

      // ==========================================
      // FIRST PAGE
      // ==========================================

      if (pageNumber === 1) {
        setDocuments(newDocuments);
      } else {
        // ==========================================
        // APPEND NEXT PAGE
        // ==========================================

        setDocuments((previousDocuments) => {
          const existingIds = new Set(
            previousDocuments.map((document) => document._id)
          );

          const uniqueDocuments = newDocuments.filter(
            (document) => !existingIds.has(document._id)
          );

          return [...previousDocuments, ...uniqueDocuments];
        });
      }

      // ==========================================
      // CHECK IF MORE DOCUMENTS EXIST
      // ==========================================

      const pagination =
        response?.data?.pagination ||
        response?.pagination ||
        response?.data?.meta ||
        response?.meta;

      if (pagination) {
        const currentPage =
          pagination.currentPage ||
          pagination.page ||
          pageNumber;

        const totalPages =
          pagination.totalPages ||
          pagination.pages;

        if (totalPages) {
          setHasMore(currentPage < totalPages);
        } else if (
          pagination.hasNextPage !== undefined
        ) {
          setHasMore(Boolean(pagination.hasNextPage));
        } else {
          setHasMore(newDocuments.length === 10);
        }
      } else {
        /*
          Current backend returns all documents.

          In that case there is nothing more to request.
        */

        setHasMore(false);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load documents."
      );
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadDocuments(1);
  }, []);

  // ==========================================
  // LOAD NEXT PAGE
  // ==========================================

  const loadMoreDocuments = () => {
    if (
      loading ||
      loadingMore ||
      !hasMore
    ) {
      return;
    }

    const nextPage = page + 1;

    setPage(nextPage);

    loadDocuments(nextPage);
  };

  // ==========================================
  // INFINITE SCROLL
  // ==========================================

  useEffect(() => {
    const observerTarget = observerRef.current;

    if (!observerTarget) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting) {
          loadMoreDocuments();
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      }
    );

    observer.observe(observerTarget);

    return () => {
      observer.disconnect();
    };
  }, [
    loading,
    loadingMore,
    hasMore,
    page,
  ]);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main className="min-h-screen bg-paper text-ink">
<section className="w-full px-6 pb-10 pt-12 sm:px-10 md:px-14 lg:px-20 xl:px-24">

  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

    <div>
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue">
        DocYard Archive
      </span>

      <h1 className="mt-3 font-display text-5xl font-semibold leading-none tracking-[-0.045em] text-ink sm:text-6xl">
        Documents
      </h1>

      <p className="mt-3 text-base text-ink-soft">
        Explore documents shared by the DocYard community.
      </p>
    </div>

    <Link
      to="/documents/search"
      className="inline-flex h-10 w-fit items-center gap-2 rounded-md border border-ink px-4 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
    >
      Search Documents
    </Link>

  </div>

</section>


      {/* ==========================================
          DOCUMENT CONTENT
      ========================================== */}

      <section className="w-full px-6 pb-24 sm:px-10 md:px-14 lg:px-20 xl:px-24">

        <div className="w-full">

          {/* ==========================================
              DOCUMENT COUNT
          ========================================== */}

          {!loading && !error && (
            <div className="pb-6">

              <p className="text-sm font-medium text-ink-soft md:text-base">
                {documents.length}{" "}
                {documents.length === 1
                  ? "document"
                  : "documents"}
              </p>

            </div>
          )}


          {/* ==========================================
              ERROR
          ========================================== */}

          {error && (
            <div
              className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700"
              role="alert"
            >
              {error}
            </div>
          )}


          {/* ==========================================
              INITIAL LOADING
          ========================================== */}

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

                      <div className="mt-5 h-4 w-64 animate-pulse rounded bg-paper" />

                    </div>

                    <div className="h-11 w-full animate-pulse rounded-md bg-paper md:w-36" />

                  </div>

                </div>
              ))}

            </div>
          )}


          {/* ==========================================
              EMPTY STATE
          ========================================== */}

          {!loading &&
            !error &&
            documents.length === 0 && (
              <div className="w-full rounded-xl border border-line bg-paper-raised px-6 py-20 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper text-xl text-ink-soft">
                  —
                </div>

                <h2 className="mt-5 font-display text-3xl font-semibold">
                  No documents yet.
                </h2>

                <p className="mx-auto mt-3 max-w-md text-base leading-7 text-ink-soft">
                  Documents shared with the DocYard
                  community will appear here.
                </p>

              </div>
            )}


          {/* ==========================================
              DOCUMENT FEED
          ========================================== */}

          {!loading &&
            !error &&
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

                        {/* ==================================
                            FILE TYPE
                        ================================== */}

                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-ink text-paper">

                          <span className="font-mono text-xs font-medium uppercase">
                            {(
                              document.fileType ||
                              "DOC"
                            ).replace(".", "")}
                          </span>

                        </div>


                        {/* ==================================
                            DOCUMENT INFORMATION
                        ================================== */}

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


                          {/* ==================================
                              METADATA
                          ================================== */}

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


                        {/* ==================================
                            READ BUTTON
                        ================================== */}

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


                {/* ==========================================
                    LOADING MORE
                ========================================== */}

                {loadingMore && (
                  <div className="flex items-center justify-center py-10">

                    <div className="flex items-center gap-3 text-sm text-ink-soft">

                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-ink" />

                      Loading more documents...

                    </div>

                  </div>
                )}


                {/* ==========================================
                    INFINITE SCROLL TRIGGER
                ========================================== */}

                {hasMore && (
                  <div
                    ref={observerRef}
                    className="h-10 w-full"
                    aria-hidden="true"
                  />
                )}


                {/* ==========================================
                    END OF DOCUMENTS
                ========================================== */}

                {!hasMore && documents.length > 0 && (
                  <div className="flex items-center justify-center py-10">

                    <p className="text-sm text-ink-faint">
                      You have reached the end of
                      the archive.
                    </p>

                  </div>
                )}

              </div>
            )}

        </div>

      </section>

    </main>
  );
};

export default Document;