import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getAllDocuments } from "../services/document.js";
import { searchDocuments } from "../services/search.js";


// ======================================
// DOCUMENTS PAGE
// ======================================

const Documents = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [documents, setDocuments] = useState([]);

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ======================================
  // LOAD DOCUMENTS
  // ======================================

  const loadDocuments = async () => {
    setLoading(true);
    setError("");

    try {
      let response;

      if (search.trim()) {
        response = await searchDocuments({
          q: search.trim(),
          category: category || undefined,
        });
      } else {
        response = await getAllDocuments({
          category: category || undefined,
        });
      }

      const data =
        response?.data?.documents ||
        response?.data?.data ||
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
        "Unable to load documents."
      );

      setDocuments([]);

    } finally {
      setLoading(false);
    }
  };


  // ======================================
  // INITIAL LOAD
  // ======================================

  useEffect(() => {
    loadDocuments();
  }, [
    searchParams,
  ]);


  // ======================================
  // SEARCH
  // ======================================

  const handleSearch = (event) => {
    event.preventDefault();

    const params = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (category) {
      params.category = category;
    }

    setSearchParams(params);
  };


  // ======================================
  // CATEGORY
  // ======================================

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategory(value);

    const params = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (value) {
      params.category = value;
    }

    setSearchParams(params);
  };


  // ======================================
  // CLEAR FILTERS
  // ======================================

  const clearFilters = () => {
    setSearch("");
    setCategory("");

    setSearchParams({});
  };


  return (
    <main>

      {/* ================================= */}
      {/* PAGE HEADER                        */}
      {/* ================================= */}

      <section className="page-header">

        <div className="container">

          <span className="page-eyebrow">
            DOCYARD LIBRARY
          </span>

          <h1>
            Explore Documents
          </h1>

          <p>
            Discover useful documents, resources,
            notes, and knowledge shared on DocYard.
          </p>

        </div>

      </section>


      {/* ================================= */}
      {/* SEARCH & FILTERS                   */}
      {/* ================================= */}

      <section className="document-controls">

        <div className="container">

          <form
            className="document-search-form"
            onSubmit={handleSearch}
          >

            <input
              type="search"
              className="form-input"
              placeholder="Search documents..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <select
              className="form-select"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">
                All Categories
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

            <button
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button>

            {(search || category) && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearFilters}
              >
                Clear
              </button>
            )}

          </form>

        </div>

      </section>


      {/* ================================= */}
      {/* DOCUMENTS                          */}
      {/* ================================= */}

      <section className="documents-section">

        <div className="container">

          <div className="documents-heading">

            <div>

              <span className="page-eyebrow">
                DOCUMENTS
              </span>

              <h2>
                {search
                  ? `Search results for "${search}"`
                  : "Latest Documents"}
              </h2>

            </div>

            <span className="document-count">
              {documents.length} document
              {documents.length !== 1 ? "s" : ""}
            </span>

          </div>


          {/* ================================= */}
          {/* LOADING                            */}
          {/* ================================= */}

          {loading && (
            <div className="loading-container">
              <p>
                Loading documents...
              </p>
            </div>
          )}


          {/* ================================= */}
          {/* ERROR                              */}
          {/* ================================= */}

          {!loading && error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}


          {/* ================================= */}
          {/* EMPTY                              */}
          {/* ================================= */}

          {!loading &&
            !error &&
            documents.length === 0 && (
              <div className="empty-state">

                <h3>
                  No documents found
                </h3>

                <p>
                  Try changing your search or filters.
                </p>

                {(search || category) && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={clearFilters}
                    style={{ marginTop: "18px" }}
                  >
                    Clear Filters
                  </button>
                )}

              </div>
            )}


          {/* ================================= */}
          {/* DOCUMENT GRID                      */}
          {/* ================================= */}

          {!loading &&
            !error &&
            documents.length > 0 && (

              <div className="document-grid">

                {documents.map((document) => (

                  <article
                    className="document-card"
                    key={document._id}
                  >

                    {/* FILE TYPE */}

                    <div className="document-card-top">

                      <div className="document-file-icon">
                        {document.fileType
                          ?.toUpperCase() || "DOC"}
                      </div>

                      <span className="document-category">
                        {document.category}
                      </span>

                    </div>


                    {/* CONTENT */}

                    <div className="document-card-content">

                      <h3>
                        {document.title}
                      </h3>

                      <p className="document-description">
                        {document.description}
                      </p>

                      <p className="document-author">
                        By {document.author}
                      </p>


                      {/* TAGS */}

                      {document.tags?.length > 0 && (
                        <div className="document-tags">

                          {document.tags
                            .slice(0, 3)
                            .map((tag) => (
                              <span
                                key={tag}
                                className="document-tag"
                              >
                                #{tag}
                              </span>
                            ))}

                        </div>
                      )}

                    </div>


                    {/* FOOTER */}

                    <div className="document-card-footer">

                      <div className="document-stats">

                        <span>
                          👁 {document.views || 0}
                        </span>

                        <span>
                          ↓ {document.downloads || 0}
                        </span>

                      </div>

                      <Link
                        to={`/documents/${document.slug}`}
                        className="document-view-link"
                      >
                        View →
                      </Link>

                    </div>

                  </article>

                ))}

              </div>

            )}

        </div>

      </section>

    </main>
  );
};


export default Documents;