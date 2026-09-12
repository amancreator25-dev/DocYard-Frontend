import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getMyDocuments,
  deleteDocument,
} from "../../services/document.service.js";

const MyDocuments = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // ======================================
  // LOAD MY DOCUMENTS
  // ======================================

  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getMyDocuments();

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
            err?.message ||
            "Unable to load your documents."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  // ======================================
  // DELETE DOCUMENT
  // ======================================

  const handleDelete = async (documentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) return;

    setDeletingId(documentId);
    setError("");

    try {
      await deleteDocument(documentId);

      setDocuments((previous) =>
        previous.filter(
          (document) =>
            document._id !== documentId
        )
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to delete the document."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ======================================
  // FORMAT DATE
  // ======================================

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

  // ======================================
  // PAGE
  // ======================================

  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="w-full px-6 pb-12 pt-14 sm:px-10 md:px-14 md:pb-14 md:pt-20 lg:px-20 xl:px-24">

        <div className="w-full">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            {/* HEADER CONTENT */}

            <div>

              <span className="page-eyebrow">
                YOUR ARCHIVE
              </span>


              <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[76px]">
                My Documents
              </h1>


              <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                Manage the documents you've
                contributed to DocYard.
              </p>

            </div>


            {/* CONTRIBUTE BUTTON */}

            <Link
              to="/contribute"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-blue px-7 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:bg-[#0f3152] active:translate-y-0"
            >
              Contribute a document

              <span className="ml-2 text-base">
                →
              </span>
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="w-full px-6 pb-24 sm:px-10 md:px-14 lg:px-20 xl:px-24">

        <div className="w-full">


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
              COUNT / TOOLBAR
          ================================================= */}

          {!loading && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-paper-raised px-5 py-4">

              <div>

                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                  Your archive
                </span>

                <p className="mt-1 text-base font-medium text-ink">

                  {documents.length}{" "}

                  {documents.length === 1
                    ? "document"
                    : "documents"}

                </p>

              </div>


              <Link
                to="/documents"
                className="inline-flex h-10 items-center rounded-md border border-line bg-paper px-5 text-sm font-medium text-ink-soft transition hover:border-ink hover:bg-white hover:text-ink"
              >
                Browse all documents

                <span className="ml-2">
                  →
                </span>
              </Link>

            </div>
          )}


          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="grid w-full gap-4">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-full rounded-xl border border-line bg-paper-raised p-6 md:p-7"
                >

                  <div className="grid gap-6 md:grid-cols-[80px_minmax(0,1fr)_220px] md:items-center">

                    {/* ICON */}

                    <div className="h-16 w-16 animate-pulse rounded-md bg-paper" />


                    {/* CONTENT */}

                    <div>

                      <div className="h-3 w-24 animate-pulse rounded bg-paper" />

                      <div className="mt-4 h-8 max-w-xl animate-pulse rounded bg-paper" />

                      <div className="mt-3 h-4 max-w-3xl animate-pulse rounded bg-paper" />

                      <div className="mt-4 h-3 w-64 animate-pulse rounded bg-paper" />

                    </div>


                    {/* BUTTONS */}

                    <div className="flex gap-2 md:justify-end">

                      <div className="h-11 w-20 animate-pulse rounded-md bg-paper" />

                      <div className="h-11 w-20 animate-pulse rounded-md bg-paper" />

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}


          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {!loading &&
            documents.length === 0 && (
              <div className="w-full rounded-xl border border-line bg-paper-raised px-6 py-20 text-center md:px-10">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-paper text-2xl text-ink-soft">
                  +
                </div>


                <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                  YOUR ARCHIVE
                </span>


                <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
                  No documents yet.
                </h2>


                <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-ink-soft">
                  Documents you contribute to
                  DocYard will appear here.
                </p>


                <Link
                  to="/contribute"
                  className="mt-7 inline-flex h-11 items-center rounded-md bg-blue px-6 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:bg-[#0f3152]"
                >
                  Contribute your first document

                  <span className="ml-2">
                    →
                  </span>
                </Link>

              </div>
            )}


          {/* =================================================
              DOCUMENT LIST
          ================================================= */}

          {!loading &&
            documents.length > 0 && (
              <section className="grid w-full gap-4">

                {documents.map((document) => (

                  <article
                    key={document._id}
                    className="group w-full rounded-xl border border-line bg-paper-raised p-6 transition-all duration-200 hover:-translate-y-[2px] hover:border-ink/30 hover:bg-white hover:shadow-sm md:p-7 lg:p-8"
                  >

                    <div className="grid gap-6 md:grid-cols-[80px_minmax(0,1fr)_240px] md:items-center">


                      {/* =================================================
                          DOCUMENT TYPE
                      ================================================= */}

                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-ink text-paper">

                        <div className="relative flex h-full w-full items-center justify-center">

                          <span className="absolute inset-[6px] border border-paper/25" />

                          <span className="relative font-mono text-xs font-medium uppercase tracking-wide">
                            {(
                              document.fileType ||
                              "DOC"
                            ).replace(".", "")}
                          </span>

                        </div>

                      </div>


                      {/* =================================================
                          CONTENT
                      ================================================= */}

                      <div className="min-w-0">

                        {/* CATEGORY + DATE */}

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


                        {/* TITLE */}

                        <h2 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[-0.015em] sm:text-3xl">

                          {document.slug ? (

                            <Link
                              to={`/documents/${document.slug}`}
                              className="transition-colors hover:text-blue"
                            >
                              {document.title}
                            </Link>

                          ) : (

                            document.title

                          )}

                        </h2>


                        {/* DESCRIPTION */}

                        <p className="mt-3 line-clamp-2 max-w-4xl text-base leading-7 text-ink-soft">
                          {document.description ||
                            "No description available."}
                        </p>


                        {/* METADATA */}

                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-faint">

                          {document.author && (
                            <span>
                              By{" "}
                              <span className="font-medium text-ink-soft">
                                {document.author}
                              </span>
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


                      {/* =================================================
                          ACTIONS
                      ================================================= */}

                      <div className="flex flex-wrap items-center gap-2 md:justify-end">

                        {/* VIEW */}

                        {document.slug && (
                          <Link
                            to={`/documents/${document.slug}`}
                            className="inline-flex h-11 items-center justify-center rounded-md bg-blue px-6 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:bg-[#0f3152] active:translate-y-0"
                          >
                            View

                            <span className="ml-2">
                              →
                            </span>
                          </Link>
                        )}


                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/documents/edit/${document._id}`
                            )
                          }
                          className="inline-flex h-11 items-center justify-center rounded-md border border-line bg-paper px-5 text-sm font-semibold text-ink transition hover:border-ink hover:bg-white"
                        >
                          Edit
                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              document._id
                            )
                          }
                          disabled={
                            deletingId ===
                            document._id
                          }
                          className="inline-flex h-11 items-center justify-center rounded-md border border-line bg-paper px-5 text-sm font-semibold text-ink-soft transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId ===
                          document._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </div>

                    </div>

                  </article>

                ))}

              </section>
            )}

        </div>

      </section>

    </main>
  );
};

export default MyDocuments;