import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getDocumentBySlug,
  updateDocument,
} from "../services/document.js";

import useAuth from "../hooks/useAuth.js";


// ======================================
// EDIT DOCUMENT
// ======================================

const EditDocument = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [documentId, setDocumentId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
    tags: "",
    language: "English",
    visibility: "public",
  });

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


// ======================================
// LOAD DOCUMENT
// ======================================

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getDocumentBySlug(slug);

        const documentData =
          response?.data?.document ||
          response?.document ||
          response?.data ||
          null;

        if (!documentData) {
          setError("Document not found.");
          return;
        }

        setDocumentId(documentData._id);

        setFormData({
          title: documentData.title || "",
          description:
            documentData.description || "",
          author: documentData.author || "",
          category:
            documentData.category || "",
          tags: Array.isArray(documentData.tags)
            ? documentData.tags.join(", ")
            : documentData.tags || "",
          language:
            documentData.language || "English",
          visibility:
            documentData.visibility || "public",
        });

      } catch (err) {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load document."
        );
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && slug) {
      loadDocument();
    } else {
      setLoading(false);
    }
  }, [slug, isAuthenticated]);


// ======================================
// INPUT CHANGE
// ======================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };


// ======================================
// FILE CHANGE
// ======================================

  const handleFileChange = (event) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError(
        "Only PDF, DOCX and TXT files are supported."
      );

      event.target.value = "";
      setFile(null);

      return;
    }

    setFile(selectedFile);
    setError("");
  };


// ======================================
// SUBMIT
// ======================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!documentId) {
      setError("Document could not be identified.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Document title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError(
        "Document description is required."
      );
      return;
    }

    if (!formData.author.trim()) {
      setError("Author name is required.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    setSaving(true);

    try {
      const updateData = new FormData();

      updateData.append(
        "title",
        formData.title.trim()
      );

      updateData.append(
        "description",
        formData.description.trim()
      );

      updateData.append(
        "author",
        formData.author.trim()
      );

      updateData.append(
        "category",
        formData.category
      );

      updateData.append(
        "language",
        formData.language
      );

      updateData.append(
        "visibility",
        formData.visibility
      );

      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      tags.forEach((tag) => {
        updateData.append("tags", tag);
      });

      // Only send a file if the user selected
      // a replacement file.
      if (file) {
        updateData.append("file", file);
      }

      const response =
        await updateDocument(
          documentId,
          updateData
        );

      const updatedDocument =
        response?.data?.document ||
        response?.document ||
        null;

      setSuccess(
        "Document updated successfully."
      );

      setTimeout(() => {
        if (updatedDocument?.slug) {
          navigate(
            `/documents/${updatedDocument.slug}`
          );
        } else {
          navigate(`/documents/${slug}`);
        }
      }, 800);

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Unable to update document."
      );
    } finally {
      setSaving(false);
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
              Sign in to edit your documents.
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
// LOADING
// ======================================

  if (loading) {
    return (
      <main className="edit-document-page">

        <div className="container">

          <div className="loading-container">
            <p>
              Loading document...
            </p>
          </div>

        </div>

      </main>
    );
  }


// ======================================
// ERROR
// ======================================

  if (error && !documentId) {
    return (
      <main className="edit-document-page">

        <div className="container">

          <div className="alert alert-error">
            {error}
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              navigate("/my-documents")
            }
          >
            ← Back to My Documents
          </button>

        </div>

      </main>
    );
  }


// ======================================
// PAGE
// ======================================

  return (
    <main className="edit-document-page">

      <div className="container">

        {/* HEADER */}

        <div className="edit-document-header">

          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate("/my-documents")
            }
          >
            ← Back to My Documents
          </button>

          <span className="page-eyebrow">
            MY DOCYARD
          </span>

          <h1>
            Edit Document
          </h1>

          <p>
            Update the information or replace
            the file for your document.
          </p>

        </div>


        {/* CARD */}

        <div className="upload-card">

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}


          <form
            className="upload-form"
            onSubmit={handleSubmit}
          >

            {/* TITLE */}

            <div className="form-group">

              <label
                htmlFor="edit-title"
                className="form-label"
              >
                Document Title
              </label>

              <input
                id="edit-title"
                name="title"
                type="text"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                maxLength={150}
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label
                htmlFor="edit-description"
                className="form-label"
              >
                Description
              </label>

              <textarea
                id="edit-description"
                name="description"
                className="form-input"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                maxLength={1000}
                required
              />

            </div>


            {/* AUTHOR */}

            <div className="form-group">

              <label
                htmlFor="edit-author"
                className="form-label"
              >
                Author
              </label>

              <input
                id="edit-author"
                name="author"
                type="text"
                className="form-input"
                value={formData.author}
                onChange={handleChange}
                maxLength={100}
                required
              />

            </div>


            {/* CATEGORY + LANGUAGE */}

            <div className="form-row">

              <div className="form-group">

                <label
                  htmlFor="edit-category"
                  className="form-label"
                >
                  Category
                </label>

                <select
                  id="edit-category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="notes">
                    Notes
                  </option>

                  <option value="education">
                    Education
                  </option>

                  <option value="technology">
                    Technology
                  </option>

                  <option value="research">
                    Research
                  </option>

                  <option value="business">
                    Business
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label
                  htmlFor="edit-language"
                  className="form-label"
                >
                  Language
                </label>

                <select
                  id="edit-language"
                  name="language"
                  className="form-select"
                  value={formData.language}
                  onChange={handleChange}
                >

                  <option value="English">
                    English
                  </option>

                  <option value="Hindi">
                    Hindi
                  </option>

                  <option value="Spanish">
                    Spanish
                  </option>

                  <option value="French">
                    French
                  </option>

                  <option value="German">
                    German
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>


            {/* TAGS */}

            <div className="form-group">

              <label
                htmlFor="edit-tags"
                className="form-label"
              >
                Tags
              </label>

              <input
                id="edit-tags"
                name="tags"
                type="text"
                className="form-input"
                value={formData.tags}
                onChange={handleChange}
                placeholder="javascript, programming, notes"
              />

              <small className="form-help">
                Separate tags with commas.
              </small>

            </div>


            {/* VISIBILITY */}

            <div className="form-group">

              <label
                htmlFor="edit-visibility"
                className="form-label"
              >
                Visibility
              </label>

              <select
                id="edit-visibility"
                name="visibility"
                className="form-select"
                value={formData.visibility}
                onChange={handleChange}
              >

                <option value="public">
                  Public — Everyone can view it
                </option>

                <option value="private">
                  Private — Only you can view it
                </option>

              </select>

            </div>


            {/* REPLACE FILE */}

            <div className="form-group">

              <label
                htmlFor="edit-file"
                className="form-label"
              >
                Replace Document File
                <span className="optional-text">
                  {" "} (Optional)
                </span>
              </label>

              <input
                id="edit-file"
                type="file"
                className="form-file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
              />

              <small className="form-help">
                Leave empty to keep the existing
                document file.
              </small>

              {file && (
                <small className="form-help">
                  New file: {file.name}
                </small>
              )}

            </div>


            {/* ACTIONS */}

            <div className="upload-actions">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  navigate("/my-documents")
                }
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
};


export default EditDocument;