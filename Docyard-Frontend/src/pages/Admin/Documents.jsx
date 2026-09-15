import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  getAllDocumentsAdmin,
  adminDeleteDocument,
} from "../../services/admin.service.js";

import Loader from "../../components/Common/Loader.jsx";
import EmptyState from "../../components/Common/EmptyState.jsx";

const AdminDocuments = () => {
  const [searchParams] = useSearchParams();

  const visibility = searchParams.get("visibility") || "";

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllDocumentsAdmin(visibility);

      const data =
        response?.data?.data?.documents ||
        response?.data?.documents ||
        response?.documents ||
        [];

      setDocuments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [visibility]);

  const handleDelete = async (documentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(documentId);
      setError("");

      await adminDeleteDocument(documentId);

      setDocuments((previous) =>
        previous.filter(
          (document) =>
            (document._id || document.id) !== documentId
        )
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to delete the document."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString();
  };

  const pageTitle =
    visibility === "public"
      ? "Public documents."
      : visibility === "private"
        ? "Private documents."
        : "Documents.";

  const pageDescription =
    visibility === "public"
      ? "Review and manage documents currently visible in the public archive."
      : visibility === "private"
        ? "Review and manage documents currently restricted to private access."
        : "Review and manage documents across the DocYard archive.";

  const countLabel =
    visibility === "public"
      ? "PUBLIC DOCUMENTS"
      : visibility === "private"
        ? "PRIVATE DOCUMENTS"
        : "DOCUMENTS";

  return (
    <main className="min-h-screen border-t border-ink bg-paper text-ink">
      {/* HEADER */}

      <section className="px-6 pb-10 pt-12 md:px-10 md:pb-12 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="page-eyebrow">
              ADMIN / DOCUMENTS
            </span>

            <h1 className="mt-3 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              {pageTitle}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-soft md:text-base">
              {pageDescription}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
              {documents.length} {countLabel}
            </span>

            <Link
              to="/admin"
              className="inline-flex items-center justify-center rounded-md border border-line bg-white px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ERROR */}

      {error && (
        <section className="px-6 pb-8 md:px-10 lg:px-16">
          <div
            className="rounded-md border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft"
            role="alert"
          >
            {error}
          </div>
        </section>
      )}

      {/* DOCUMENTS */}

      <section className="px-6 pb-16 md:px-10 lg:px-16">
        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center rounded-md border border-line bg-white">
            <Loader />
          </div>
        ) : documents.length === 0 ? (
          <div className="rounded-md border border-line bg-white px-6 py-16 text-center">
            <EmptyState
              title={
                visibility
                  ? `No ${visibility} documents found.`
                  : "No documents found."
              }
              message={
                visibility
                  ? `There are currently no ${visibility} documents available to manage.`
                  : "There are currently no documents available to manage."
              }
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border border-line bg-white">
            {/* TABLE HEADER */}

            <div className="hidden border-b border-line bg-paper-raised px-6 py-4 md:grid md:grid-cols-[1fr_190px_140px_100px] md:gap-6">
              <span className="table-heading">
                DOCUMENT
              </span>

              <span className="table-heading">
                AUTHOR
              </span>

              <span className="table-heading">
                CREATED
              </span>

              <span className="table-heading text-right">
                ACTION
              </span>
            </div>

            {/* DOCUMENT ROWS */}

            {documents.map((document) => {
              const documentId =
                document._id || document.id;

              const title =
                document.title || "Untitled document";

              const author =
                document.createdBy?.username ||
                document.createdBy?.fullname ||
                document.author?.username ||
                document.user?.username ||
                "Unknown";

              const slug = document.slug;

              const isDeleting =
                deletingId === documentId;

              return (
                <article
                  key={documentId}
                  className="grid gap-5 border-b border-line px-6 py-7 last:border-b-0 md:grid-cols-[1fr_190px_140px_100px] md:items-center md:gap-6"
                >
                  {/* DOCUMENT */}

                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-blue">
                      {document.visibility || "DOCUMENT"}
                    </span>

                    {slug ? (
                      <Link
                        to={`/documents/${slug}`}
                        className="mt-2 block truncate font-display text-xl font-semibold tracking-tight transition-colors hover:text-blue"
                      >
                        {title}
                      </Link>
                    ) : (
                      <h2 className="mt-2 truncate font-display text-xl font-semibold tracking-tight">
                        {title}
                      </h2>
                    )}

                    {document.category && (
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
                        {document.category}
                      </p>
                    )}
                  </div>

                  {/* AUTHOR */}

                  <div>
                    <span className="table-heading md:hidden">
                      AUTHOR
                    </span>

                    <p className="mt-1 text-sm text-ink-soft md:mt-0">
                      {author}
                    </p>
                  </div>

                  {/* CREATED */}

                  <div>
                    <span className="table-heading md:hidden">
                      CREATED
                    </span>

                    <p className="mt-1 font-mono text-[10px] text-ink-faint md:mt-0">
                      {formatDate(document.createdAt)}
                    </p>
                  </div>

                  {/* ACTION */}

                  <div className="flex justify-start md:justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(documentId)
                      }
                      disabled={isDeleting}
                      className="inline-flex rounded-md border border-line px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-ink transition-all duration-200 hover:border-red-500 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeleting
                        ? "Deleting"
                        : "Delete"}
                    </button>
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

export default AdminDocuments;