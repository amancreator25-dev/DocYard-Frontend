import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getMyDocuments,
  updateDocument,
  deleteDocument,
} from "../../services/document.service.js";

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [error, setError] = useState("");

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  // LOAD DOCUMENTS
  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyDocuments();

      const data =
        response?.data?.documents ||
        response?.documents ||
        response?.data ||
        [];

      setDocuments(Array.isArray(data) ? data : []);
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

  useEffect(() => {
    loadDocuments();
  }, []);

  // OPEN EDIT FORM
  const handleEdit = (document) => {
    setEditingDocument(document);

    setEditForm({
      title: document.title || "",
      description: document.description || "",
      category: document.category || "",
    });

    setError("");
  };

  // HANDLE FORM INPUTS
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // UPDATE DOCUMENT USING EXISTING API
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingDocument || updating) return;

    try {
      setUpdating(true);
      setError("");

      await updateDocument(
        editingDocument._id,
        editForm
      );

      setEditingDocument(null);
      await loadDocuments();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to update the document."
      );
    } finally {
      setUpdating(false);
    }
  };

  // DELETE DOCUMENT
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
          (document) => document._id !== documentId
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

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen border-t border-ink bg-paper text-ink">
      {/* HEADER */}
      <section className="px-6 pb-10 pt-12 md:px-10 md:pb-12 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="page-eyebrow">
              YOUR ARCHIVE
            </span>

            <h1 className="mt-3 font-display text-5xl font-semibold leading-none tracking-tight md:text-6xl lg:text-7xl">
              My Documents
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-ink-soft md:text-base">
              Manage the documents you have contributed to DocYard.
            </p>
          </div>

          <Link
            to="/upload"
            className="inline-flex w-fit items-center justify-center rounded-md bg-[#0A3A63] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] !text-[#ffffff] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#082F50]"
          >
            Contribute Document
          </Link>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="px-6 pb-6 md:px-10 lg:px-16">
          <div
            className="rounded-md border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        </div>
      )}

      {/* EDIT DOCUMENT FORM */}
      {editingDocument && (
        <section className="px-6 pb-8 md:px-10 lg:px-16">
          <div className="rounded-md border border-line bg-white p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-blue">
                  DOCUMENT SETTINGS
                </span>

                <h2 className="mt-2 font-display text-3xl font-semibold">
                  Edit Document
                </h2>
              </div>

            </div>

            <form
              onSubmit={handleUpdate}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium"
                >
                  Document Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-md border border-line bg-paper px-4 py-3 text-sm outline-none transition focus:border-ink"
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  rows={4}
                  className="w-full resize-y rounded-md border border-line bg-paper px-4 py-3 text-sm outline-none transition focus:border-ink"
                  placeholder="Enter document description"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium"
                >
                  Category
                </label>

                <input
                  id="category"
                  name="category"
                  type="text"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-line bg-paper px-4 py-3 text-sm outline-none transition focus:border-ink"
                  placeholder="Enter document category"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={updating}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-[#0A3A63] px-6 text-sm font-semibold !text-white transition hover:bg-[#082F50] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updating
                    ? "Saving Changes..."
                    : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingDocument(null);
                    setError("");
                  }}
                  disabled={updating}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-line px-6 text-sm font-medium transition hover:bg-paper disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* ARCHIVE SUMMARY */}
      {!loading && (
        <section className="px-6 pb-6 md:px-10 lg:px-16">
          <div className="flex flex-col gap-4 rounded-md border border-line bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-blue">
                Archive
              </span>

              <p className="mt-1 text-sm font-medium">
                {documents.length}{" "}
                {documents.length === 1
                  ? "document"
                  : "documents"}
              </p>
            </div>

            <Link
              to="/documents"
              className="inline-flex w-fit items-center justify-center rounded-md border border-line bg-paper px-5 py-2.5 text-xs font-semibold text-ink transition-all duration-200 hover:border-ink hover:bg-white"
            >
              Browse all documents
            </Link>
          </div>
        </section>
      )}

      {/* CONTENT */}
      <section className="px-6 pb-20 pt-2 md:px-10 lg:px-16">
        {/* LOADING */}
        {loading && (
          <div className="grid gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-md border border-line bg-white p-6 md:p-7"
              >
                <div className="grid gap-6 md:grid-cols-[64px_minmax(0,1fr)_auto] md:items-center">
                  <div className="h-14 w-14 rounded-md bg-paper-raised" />

                  <div>
                    <div className="h-3 w-24 rounded bg-paper-raised" />
                    <div className="mt-4 h-7 max-w-lg rounded bg-paper-raised" />
                    <div className="mt-3 h-4 max-w-2xl rounded bg-paper-raised" />
                  </div>

                  <div className="flex gap-2">
                    <div className="h-10 w-20 rounded-md bg-paper-raised" />
                    <div className="h-10 w-20 rounded-md bg-paper-raised" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && documents.length === 0 && (
          <div className="rounded-md border border-line bg-white px-6 py-20 text-center md:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line bg-paper font-display text-2xl text-ink-soft">
              +
            </div>

            <h2 className="mt-6 font-display text-3xl font-semibold">
              No documents yet.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
              Documents you contribute to DocYard will appear here.
            </p>

            <Link
              to="/upload"
              className="mt-7 inline-flex items-center justify-center rounded-md bg-[#0A3A63] px-6 py-3 text-xs font-semibold !text-[#ffffff] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#082F50]"
            >
              Contribute your first document
            </Link>
          </div>
        )}

        {/* DOCUMENTS */}
        {!loading && documents.length > 0 && (
          <div className="grid gap-4">
            {documents.map((document) => (
              <article
                key={document._id}
                className="group rounded-md border border-line bg-white p-6 transition-all duration-200 hover:border-ink/40 hover:shadow-sm md:p-7 lg:p-8"
              >
                <div className="grid gap-7 lg:grid-cols-[64px_minmax(0,1fr)_auto] lg:items-center">
                  {/* FILE TYPE */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-ink text-paper">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wide">
                      {(document.fileType || "DOC").replace(".", "")}
                    </span>
                  </div>

                  {/* DOCUMENT INFORMATION */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-blue">
                        {document.category || "Archive"}
                      </span>

                      <span className="text-xs text-ink-faint">
                        {formatDate(document.createdAt)}
                      </span>
                    </div>

                    <h2 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
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

                    <p className="mt-3 line-clamp-2 max-w-4xl text-sm leading-6 text-ink-soft">
                      {document.description ||
                        "No description available."}
                    </p>

                    {(document.author ||
                      document.language ||
                      document.views !== undefined) && (
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-faint">
                        {document.author && (
                          <span>
                            By{" "}
                            <span className="font-medium text-ink-soft">
                              {document.author}
                            </span>
                          </span>
                        )}

                        {document.language && (
                          <span>{document.language}</span>
                        )}

                        {document.views !== undefined && (
                          <span>{document.views} views</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {document.slug && (
                      <Link
                        to={`/documents/${document.slug}`}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-[#0A3A63] px-5 text-xs font-semibold !text-[#ffffff] transition-all duration-200 hover:-translate-y-px hover:bg-[#082F50]"
                      >
                        View
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => handleEdit(document)}
                      className="inline-flex h-10 items-center justify-center rounded-md border border-line bg-paper px-5 text-xs font-semibold text-ink transition-all duration-200 hover:border-ink hover:bg-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(document._id)}
                      disabled={deletingId === document._id}
                      className="inline-flex h-10 items-center justify-center rounded-md border border-line bg-paper px-5 text-xs font-semibold text-ink-soft transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === document._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MyDocuments;
