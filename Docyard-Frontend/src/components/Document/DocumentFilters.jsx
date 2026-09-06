import { useState } from "react";

const DocumentFilters = ({
  filters = {},
  onFilterChange,
  onReset,
}) => {
  const [search, setSearch] = useState(
    filters.search || ""
  );

  const [category, setCategory] = useState(
    filters.category || ""
  );

  const [language, setLanguage] = useState(
    filters.language || ""
  );

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearch(value);

    onFilterChange?.({
      ...filters,
      search: value,
    });
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategory(value);

    onFilterChange?.({
      ...filters,
      category: value,
    });
  };

  const handleLanguageChange = (event) => {
    const value = event.target.value;

    setLanguage(value);

    onFilterChange?.({
      ...filters,
      language: value,
    });
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setLanguage("");

    onReset?.();
  };

  return (
    <div className="border-y border-line bg-paper-raised">

      {/* FILTER HEADER */}

      <div className="flex flex-col justify-between gap-4 border-b border-line px-5 py-4 sm:flex-row sm:items-center">

        <div>

          <span className="page-eyebrow">
            FILTER ARCHIVE
          </span>

        </div>

        <button
          type="button"
          onClick={handleReset}
          className="font-mono text-[9px] uppercase tracking-wide text-ink-faint transition-colors hover:text-blue"
        >
          Reset filters
        </button>

      </div>


      {/* FILTERS */}

      <div className="grid gap-5 p-5 md:grid-cols-3">

        {/* SEARCH */}

        <div>

          <label
            htmlFor="document-search"
            className="form-label"
          >
            Search
          </label>

          <input
            id="document-search"
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search documents..."
            className="form-input"
          />

        </div>


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
            value={category}
            onChange={handleCategoryChange}
            className="form-input"
          >
            <option value="">
              All categories
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
            value={language}
            onChange={handleLanguageChange}
            className="form-input"
          >
            <option value="">
              All languages
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

    </div>
  );
};

export default DocumentFilters;