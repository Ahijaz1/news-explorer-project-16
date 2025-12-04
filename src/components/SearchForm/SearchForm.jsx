import React, { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if query is empty
    if (!query || query.trim() === "") {
      setError("Please enter a keyword");
      return;
    }

    setError("");

    onSearch(query.trim());
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <div className="search-form__input-container">
          <input
            type="text"
            className={`search-form__input ${error ? "search-form__input--error" : ""}`}
            placeholder="Enter topic"
            value={query}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="search-form__submit-btn"
            aria-label="Search"
          >
            Search
          </button>
        </div>
        {error && <div className="search-form__error">{error}</div>}
      </div>
    </form>
  );
}
