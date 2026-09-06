import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllDocuments,
  deleteDocument,
} from "../../services/document.js";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllDocuments();

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleDelete = async (documentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(documentId);
      setError("");

      await deleteDocument(documentId);

      setDocuments((previous) =>
        previous.filter(
          (document) =>
            document._id !== documentId &&
            document.id !== documentId
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

  return (
    <main className="min-h-screen bg-paper px-6 py-14 text-ink md:px-12 md:py-20">

      <div className="mx-auto max-w-[1200px]">

        {/* HEADER */}

        <header className="border-b border-line pb-10">

          <Link
            to="/admin"
            className="font-mono text-[10px] uppercase tracking-wide text-ink-faint hover:text-blue"
          >
            ← Admin dashboard
          </Link>

          <div className="mt-9">

            <span className="page-eyebrow">
              ADMIN / DOCUMENTS
            </span>

            <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <h1 className="font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
                  Documents.
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">
                  Review and manage documents
                  published to the DocYard archive.
                </p>

              </div>

              <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                {documents.length} DOCUMENTS
              </span>

            </div>

          </div>

        </header>


        {/* ERROR */}

        {error && (
          <div className="mt-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft">
            {error}
          </div>
        )}


        {/* CONTENT */}

        <section className="py-10">

          {loading ? (

            <div className="border border-line bg-white">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="border-b border-line p-6 last:border-b-0"
                >
                  <div className="h-5 w-2/3 bg-paper-raised" />
                  <div className="mt-3 h-3 w-1/3 bg-paper-raised" />
                </div>
              ))}

            </div>

          ) : documents.length === 0 ? (

            <div className="border border-line bg-white px-6 py-16 text-center">

              <span className="page-eyebrow">
                EMPTY ARCHIVE
              </span>

              <h2 className="mt-4 font-display text-3xl font-semibold">
                No documents found.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
                There are currently no documents
                available to manage.
              </p>

            </div>

          ) : (

            <div className="border border-line bg-white">

              {/* TABLE HEADER */}

              <div className="hidden border-b border-line bg-paper-raised px-6 py-4 md:grid md:grid-cols-[1fr_180px_150px_100px] md:gap-6">

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


              {/* DOCUMENTS */}

              {documents.map((document) => {

                const documentId =
                  document._id || document.id;

                const title =
                  document.title ||
                  "Untitled document";

                const author =
                  document.author?.username ||
                  document.user?.username ||
                  document.createdBy?.username ||
                  "Unknown";

                const date =
                  document.createdAt
                    ? new Date(
                        document.createdAt
                      ).toLocaleDateString()
                    : "—";

                const slug = document.slug;

                return (
                  <div
                    key={documentId}
                    className="grid gap-5 border-b border-line px-6 py-6 last:border-b-0 md:grid-cols-[1fr_180px_150px_100px] md:items-center md:gap-6"
                  >

                    {/* DOCUMENT */}

                    <div className="min-w-0">

                      <div className="flex items-start gap-3">

                        <span className="mt-1 font-mono text-[9px] text-blue">
                          DOC
                        </span>

                        <div className="min-w-0">

                          {slug ? (
                            <Link
                              to={`/documents/${slug}`}
                              className="block truncate font-display text-lg font-semibold hover:text-blue"
                            >
                              {title}
                            </Link>
                          ) : (
                            <h2 className="truncate font-display text-lg font-semibold">
                              {title}
                            </h2>
                          )}

                          {document.category && (
                            <span className="mt-1 block font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                              {document.category}
                            </span>
                          )}

                        </div>

                      </div>

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


                    {/* DATE */}

                    <div>

                      <span className="table-heading md:hidden">
                        CREATED
                      </span>

                      <p className="mt-1 font-mono text-[10px] text-ink-faint md:mt-0">
                        {date}
                      </p>

                    </div>


                    {/* ACTION */}

                    <div className="flex justify-start md:justify-end">

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(documentId)
                        }
                        disabled={
                          deletingId === documentId
                        }
                        className="font-mono text-[9px] uppercase tracking-wide text-ink-faint transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === documentId
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </section>

      </div>

    </main>
  );
};

export default Documents;