import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getMyDocuments,
  deleteDocument,
} from "../services/document.js";

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
    <main className="min-h-[calc(100vh-72px)] bg-paper px-6 py-16 text-ink md:px-12">

      <div className="mx-auto max-w-[1180px]">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <header className="flex flex-col items-start justify-between gap-7 border-b border-line pb-8 md:flex-row md:items-end">

          <div>

            <span className="page-eyebrow">
              YOUR ARCHIVE
            </span>

            <h1 className="mt-2 font-display text-5xl font-semibold leading-[1.1]">
              My Documents
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">
              Manage the documents you've
              contributed to DocYard.
            </p>

          </div>

          <Link
            to="/contribute"
            className="btn btn-primary"
          >
            Contribute a document
          </Link>

        </header>


        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {error && (
          <div className="mt-6 border border-line-strong bg-paper-raised px-4 py-3 text-sm text-ink-soft">
            {error}
          </div>
        )}


        {/* ================================= */}
        {/* COUNT */}
        {/* ================================= */}

        {!loading && (
          <div className="border-b border-line py-5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
            {documents.length}{" "}
            {documents.length === 1
              ? "document"
              : "documents"}
          </div>
        )}


        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading && (
          <div className="flex flex-col gap-3 py-10">

            <div className="h-3 w-3/4 bg-paper-raised" />

            <div className="h-3 w-1/2 bg-paper-raised" />

            <div className="h-3 w-2/3 bg-paper-raised" />

          </div>
        )}


        {/* ================================= */}
        {/* EMPTY STATE */}
        {/* ================================= */}

        {!loading &&
          documents.length === 0 && (
            <div className="mx-auto my-20 max-w-xl border border-line bg-white px-8 py-14 text-center">

              <span className="font-mono text-xs text-ink-faint">
                YOUR ARCHIVE
              </span>

              <h2 className="mt-3 font-display text-3xl font-semibold">
                No documents yet.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
                Documents you contribute to
                DocYard will appear here.
              </p>

              <Link
                to="/contribute"
                className="btn btn-primary mt-7"
              >
                Contribute your first document
              </Link>

            </div>
          )}


        {/* ================================= */}
        {/* DOCUMENT LIST */}
        {/* ================================= */}

        {!loading &&
          documents.length > 0 && (
            <section className="border-t border-line">

              {documents.map((document) => (
                <article
                  key={document._id}
                  className="grid gap-5 border-b border-line py-7 transition-colors hover:bg-paper-raised/40 md:grid-cols-[72px_minmax(0,1fr)_auto]"
                >

                  {/* DOCUMENT TYPE */}

                  <div className="flex h-[78px] w-[62px] items-center justify-center bg-ink text-paper">

                    <div className="relative flex h-full w-full items-center justify-center">

                      <span className="absolute inset-[7px] border border-paper/25" />

                      <span className="relative font-mono text-[9px] tracking-wide">
                        {(
                          document.fileType ||
                          "DOC"
                        ).toUpperCase()}
                      </span>

                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="min-w-0">

                    <div className="mb-2 flex flex-wrap items-center gap-3">

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


                    <h2 className="font-display text-[26px] font-semibold leading-tight">

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


                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-ink-soft">
                      {document.description ||
                        "No description available."}
                    </p>


                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] text-ink-faint">

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

                  <div className="flex items-center gap-3 md:self-center">

                    {document.slug && (
                      <Link
                        to={`/documents/${document.slug}`}
                        className="btn btn-primary"
                      >
                        View
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/documents/edit/${document._id}`
                        )
                      }
                      className="btn btn-ghost"
                    >
                      Edit
                    </button>

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
                      className="px-1 py-2 text-xs text-ink-faint transition-colors hover:text-ink disabled:opacity-50"
                    >
                      {deletingId ===
                      document._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>

                  </div>

                </article>
              ))}

            </section>
          )}

      </div>

    </main>
  );
};

export default MyDocuments;