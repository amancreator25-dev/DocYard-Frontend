import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getMyDocuments,
  deleteDocument,
} from "../services/document.js";

import useAuth from "../hooks/useAuth.js";


// ======================================
// MY DOCUMENTS
// ======================================

const MyDocuments = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);


// ======================================
// LOAD DOCUMENTS
// ======================================

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


  useEffect(() => {
    if (isAuthenticated) {
      loadDocuments();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);


// ======================================
// DELETE DOCUMENT
// ======================================

  const handleDelete = async (documentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) {
      return;
    }

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
        "Unable to delete document."
      );

    } finally {
      setDeletingId(null);
    }
  };


// ======================================
// NOT AUTHENTICATED
// ======================================

  if (!isAuthenticated) {
    return (
      <main className="auth-page">

        <div className="container">

          <div className="empty-state">

            <h2>
              Login Required
            </h2>

            <p>
              Sign in to view the documents
              you have uploaded.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>

          </div>

        </div>

      </main>
    );
  }


// ======================================
// PAGE
// ======================================

  return (
    <main className="my-documents-page">

      <div className="container">

        {/* ================================= */}
        {/* HEADER                             */}
        {/* ================================= */}

        <div className="my-documents-header">

          <div>

            <span className="page-eyebrow">
              MY DOCYARD
            </span>

            <h1>
              My Documents
            </h1>

            <p>
              Manage the documents you have
              uploaded to DocYard.
            </p>

          </div>

          <Link
            to="/upload"
            className="btn btn-primary"
          >
            + Upload Document
          </Link>

        </div>


        {/* ================================= */}
        {/* ERROR                              */}
        {/* ================================= */}

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}


        {/* ================================= */}
        {/* LOADING                            */}
        {/* ================================= */}

        {loading && (
          <div className="loading-container">
            <p>
              Loading your documents...
            </p>
          </div>
        )}


        {/* ================================= */}
        {/* EMPTY                              */}
        {/* ================================= */}

        {!loading &&
          documents.length === 0 && (
            <div className="empty-state">

              <h2>
                You haven't uploaded anything yet.
              </h2>

              <p>
                Upload your first document and
                start sharing your knowledge.
              </p>

              <Link
                to="/upload"
                className="btn btn-primary"
              >
                Upload Document
              </Link>

            </div>
          )}


        {/* ================================= */}
        {/* DOCUMENTS                          */}
        {/* ================================= */}

        {!loading &&
          documents.length > 0 && (

            <div className="my-documents-list">

              {documents.map((document) => (

                <article
                  className="my-document-card"
                  key={document._id}
                >

                  {/* FILE ICON */}

                  <div className="my-document-icon">
                    {document.fileType
                      ?.toUpperCase() || "DOC"}
                  </div>


                  {/* CONTENT */}

                  <div className="my-document-content">

                    <div className="my-document-title-row">

                      <h2>
                        {document.title}
                      </h2>

                      <span
                        className={`visibility-badge ${
                          document.visibility ===
                          "private"
                            ? "visibility-private"
                            : "visibility-public"
                        }`}
                      >
                        {document.visibility ||
                          "public"}
                      </span>

                    </div>

                    <p>
                      {document.description}
                    </p>

                    <div className="my-document-meta">

                      <span>
                        {document.category}
                      </span>

                      <span>
                        👁 {document.views || 0}
                      </span>

                      <span>
                        ↓ {document.downloads || 0}
                      </span>

                      {document.createdAt && (
                        <span>
                          {new Date(
                            document.createdAt
                          ).toLocaleDateString()}
                        </span>
                      )}

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="my-document-actions">

                    <Link
                      to={`/documents/${document.slug}`}
                      className="btn btn-secondary"
                    >
                      View
                    </Link>

                    <Link
                      to={`/documents/${document.slug}/edit`}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>
                        handleDelete(
                          document._id
                        )
                      }
                      disabled={
                        deletingId ===
                        document._id
                      }
                    >
                      {deletingId === document._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

      </div>

    </main>
  );
};


export default MyDocuments;