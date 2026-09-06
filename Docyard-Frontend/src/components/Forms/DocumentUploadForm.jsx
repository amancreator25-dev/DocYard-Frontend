import { useState } from "react";

const DocumentUploadForm = ({
  onSubmit,
  loading = false,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    category: initialData.category || "",
    language: initialData.language || "",
    tags: initialData.tags || "",
    file: null,
  });

  const [error, setError] = useState("");

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));

    setError("");
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.title.trim()) {
      setError("Please enter a document title.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter a description.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    if (!formData.file) {
      setError("Please select a document to upload.");
      return;
    }

    try {
      const submitData = new FormData();

      submitData.append(
        "title",
        formData.title.trim()
      );

      submitData.append(
        "description",
        formData.description.trim()
      );

      submitData.append(
        "category",
        formData.category
      );

      submitData.append(
        "language",
        formData.language
      );

      if (formData.tags.trim()) {
        submitData.append(
          "tags",
          formData.tags.trim()
        );
      }

      submitData.append(
        "file",
        formData.file
      );

      const result = await onSubmit?.(submitData);

      /*
       * Only clear the form when the parent
       * successfully handles the submission.
       */
      if (result !== false) {
        setFormData({
          title: "",
          description: "",
          category: "",
          language: "",
          tags: "",
          file: null,
        });

        const fileInput =
          document.getElementById("document-file");

        if (fileInput) {
          fileInput.value = "";
        }
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to upload the document."
      );
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-white p-6 md:p-8"
    >
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-8 border-b border-line pb-5">
        <span className="page-eyebrow">
          ADD TO ARCHIVE
        </span>

        <h2 className="mt-3 font-display text-3xl font-semibold">
          Upload document.
        </h2>

        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Add a document to the DocYard archive.
        </p>
      </div>

      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div
          className="mb-6 border border-line bg-paper-raised px-5 py-4 text-sm text-ink-soft"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* =====================================
          TITLE
      ===================================== */}

      <div>
        <label
          htmlFor="document-title"
          className="form-label"
        >
          Title
        </label>

        <input
          id="document-title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Document title"
          className="form-input"
          disabled={loading}
          required
        />
      </div>

      {/* =====================================
          DESCRIPTION
      ===================================== */}

      <div className="mt-6">
        <label
          htmlFor="document-description"
          className="form-label"
        >
          Description
        </label>

        <textarea
          id="document-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe this document..."
          rows={5}
          className="form-input min-h-[130px] resize-y"
          disabled={loading}
          required
        />
      </div>

      {/* =====================================
          CATEGORY + LANGUAGE
      ===================================== */}

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        {/* CATEGORY */}

        <div>
          <label
            htmlFor="document-category"
            className="form-label"
          >
            Category
          </label>

          <select
            id="document-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            disabled={loading}
            required
          >
            <option value="">
              Select category
            </option>

            <option value="technology">
              Technology
            </option>

            <option value="education">
              Education
            </option>

            <option value="research">
              Research
            </option>

            <option value="business">
              Business
            </option>

            <option value="design">
              Design
            </option>

            <option value="other">
              Other
            </option>
          </select>
        </div>

        {/* LANGUAGE */}

        <div>
          <label
            htmlFor="document-language"
            className="form-label"
          >
            Language
          </label>

          <select
            id="document-language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="form-input"
            disabled={loading}
          >
            <option value="">
              Select language
            </option>

            <option value="english">
              English
            </option>

            <option value="hindi">
              Hindi
            </option>

            <option value="other">
              Other
            </option>
          </select>
        </div>

      </div>

      {/* =====================================
          TAGS
      ===================================== */}

      <div className="mt-6">
        <label
          htmlFor="document-tags"
          className="form-label"
        >
          Tags
        </label>

        <input
          id="document-tags"
          name="tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g. networking, security, notes"
          className="form-input"
          disabled={loading}
        />

        <p className="mt-2 text-xs text-ink-faint">
          Separate multiple tags with commas.
        </p>
      </div>

      {/* =====================================
          FILE
      ===================================== */}

      <div className="mt-6">
        <label
          htmlFor="document-file"
          className="form-label"
        >
          Document
        </label>

        <input
          id="document-file"
          name="file"
          type="file"
          onChange={handleChange}
          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
          className="block w-full border border-line bg-paper px-4 py-3 text-sm file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-2 file:font-mono file:text-[9px] file:uppercase file:text-white"
          disabled={loading}
          required
        />
      </div>

      {/* =====================================
          ACTION
      ===================================== */}

      <div className="mt-8 flex justify-end border-t border-line pt-6">

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Uploading..."
            : "Upload document →"}
        </button>

      </div>
    </form>
  );
};

export default DocumentUploadForm;