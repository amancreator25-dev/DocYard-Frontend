import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createDocument } from "../services/document.js";
import useAuth from "../hooks/useAuth.js";


// ======================================
// UPLOAD DOCUMENT PAGE
// ======================================

const UploadDocument = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

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

  const [thumbnail, setThumbnail] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


// ======================================
// AUTH CHECK
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
              You need to sign in before uploading
              a document.
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
// HANDLE INPUT
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
// HANDLE DOCUMENT FILE
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
    setSuccess("");
  };


// ======================================
// HANDLE THUMBNAIL
// ======================================

  const handleThumbnailChange = (event) => {
    const selectedThumbnail =
      event.target.files?.[0];

    if (!selectedThumbnail) {
      setThumbnail(null);
      return;
    }

    if (!selectedThumbnail.type.startsWith("image/")) {
      setError(
        "Thumbnail must be an image file."
      );

      event.target.value = "";
      setThumbnail(null);

      return;
    }

    setThumbnail(selectedThumbnail);

    setError("");
  };


// ======================================
// SUBMIT
// ======================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!file) {
      setError(
        "Please select a document to upload."
      );
      return;
    }

    if (!formData.title.trim()) {
      setError("Document title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Document description is required.");
      return;
    }

    if (!formData.author.trim()) {
      setError("Author name is required.");
      return;
    }

    if (!formData.category.trim()) {
      setError("Please select a category.");
      return;
    }

    setLoading(true);

    try {
      const uploadData = new FormData();

      uploadData.append(
        "title",
        formData.title.trim()
      );

      uploadData.append(
        "description",
        formData.description.trim()
      );

      uploadData.append(
        "author",
        formData.author.trim()
      );

      uploadData.append(
        "category",
        formData.category
      );

      uploadData.append(
        "language",
        formData.language
      );

      uploadData.append(
        "visibility",
        formData.visibility
      );

      // Convert comma-separated tags
      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      tags.forEach((tag) => {
        uploadData.append("tags", tag);
      });

      uploadData.append(
        "file",
        file
      );

      if (thumbnail) {
        uploadData.append(
          "thumbnail",
          thumbnail
        );
      }

      const response =
        await createDocument(uploadData);

      const createdDocument =
        response?.data?.document ||
        response?.document ||
        null;

      setSuccess(
        "Document uploaded successfully!"
      );

      // Redirect to document after upload
      setTimeout(() => {
        if (createdDocument?.slug) {
          navigate(
            `/documents/${createdDocument.slug}`
          );
        } else {
          navigate("/documents");
        }
      }, 1000);

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Unable to upload document."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="upload-page">

      <div className="container">

        {/* ================================= */}
        {/* HEADER                             */}
        {/* ================================= */}

        <div className="upload-header">

          <span className="page-eyebrow">
            DOCYARD
          </span>

          <h1>
            Upload Document
          </h1>

          <p>
            Share your documents and knowledge
            with the DocYard community.
          </p>

        </div>


        {/* ================================= */}
        {/* CARD                               */}
        {/* ================================= */}

        <div className="upload-card">

          {/* ERROR */}

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}


          {/* SUCCESS */}

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
                htmlFor="title"
                className="form-label"
              >
                Document Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter document title"
                maxLength={150}
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label
                htmlFor="description"
                className="form-label"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                className="form-input"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your document..."
                rows={5}
                maxLength={1000}
                required
              />

            </div>


            {/* AUTHOR */}

            <div className="form-group">

              <label
                htmlFor="author"
                className="form-label"
              >
                Author
              </label>

              <input
                id="author"
                name="author"
                type="text"
                className="form-input"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                maxLength={100}
                required
              />

            </div>


            {/* CATEGORY + LANGUAGE */}

            <div className="form-row">

              <div className="form-group">

                <label
                  htmlFor="category"
                  className="form-label"
                >
                  Category
                </label>

                <select
                  id="category"
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
                  htmlFor="language"
                  className="form-label"
                >
                  Language
                </label>

                <select
                  id="language"
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
                htmlFor="tags"
                className="form-label"
              >
                Tags
              </label>

              <input
                id="tags"
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
                htmlFor="visibility"
                className="form-label"
              >
                Visibility
              </label>

              <select
                id="visibility"
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


            {/* DOCUMENT */}

            <div className="form-group">

              <label
                htmlFor="document-file"
                className="form-label"
              >
                Document File
              </label>

              <input
                id="document-file"
                type="file"
                className="form-file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                required
              />

              {file && (
                <small className="form-help">
                  Selected: {file.name}
                </small>
              )}

            </div>


            {/* THUMBNAIL */}

            <div className="form-group">

              <label
                htmlFor="thumbnail"
                className="form-label"
              >
                Thumbnail
                <span className="optional-text">
                  {" "} (Optional)
                </span>
              </label>

              <input
                id="thumbnail"
                type="file"
                className="form-file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />

              {thumbnail && (
                <small className="form-help">
                  Selected: {thumbnail.name}
                </small>
              )}

            </div>


            {/* SUBMIT */}

            <div className="upload-actions">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  navigate("/documents")
                }
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading
                  ? "Uploading..."
                  : "Upload Document"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
};


export default UploadDocument;