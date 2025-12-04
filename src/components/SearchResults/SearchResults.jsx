import { useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./SearchResults.css";
import { newsAPI } from "../../utils/newsAPI";
import { formatDate } from "../../utils/index";
import Preloader from "../Preloader/Preloader";
import notFoundIcon from "../../assets/images/not-found_v1.png";

function SearchResults({
  searchQuery = "",
  isLoggedIn = false,
  onSaveArticle,
  onRemoveArticle,
  savedArticles = [],
  onSignInClick,
  onSearchResults,
}) {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const articlesToShow = articles.slice(0, visibleCount);
  const hasMoreArticles = articles.length > visibleCount;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const normalizeArticle = (article, index) => {
    const normalized = {
      id: article.id || index + 1,
      title: article.title || "No title available",
      description: article.description || "No description available",
      source:
        typeof article.source === "object"
          ? article.source?.name
          : article.source || "Unknown source",
      date: article.date || formatDate(article.publishedAt),
      imageUrl: article.imageUrl || article.urlToImage,
      url: article.url,
    };
    return normalized;
  };

  const handleApiError = (error) => {
    if (error.message && error.message.includes("429")) {
      return "API rate limit reached. Please try again later.";
    } else if (error.message && error.message.includes("401")) {
      return "API authentication failed. Please check your API key.";
    } else if (error.message && error.message.includes("Network")) {
      return "Network error. Please check your internet connection.";
    } else if (error.message && error.message.includes("keyword")) {
      return error.message;
    } else {
      return "Sorry, something went wrong during the request. Please try again later.";
    }
  };

  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      handleSearch(searchQuery);
    } else {
      setArticles([]);
      setHasSearched(false);
      setError(null);
      setVisibleCount(3);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setArticles([]);
      setHasSearched(false);
      setError(null);
      setVisibleCount(3);
    }
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    setVisibleCount(3);
    setHasSearched(true);

    try {
      const response = await newsAPI.searchArticles(query);
      if (response.articles && response.articles.length > 0) {
        const normalizedArticles = response.articles.map(normalizeArticle);
        setArticles(normalizedArticles);
        if (onSearchResults) {
          onSearchResults(normalizedArticles);
        }
      } else {
        setArticles([]);
        if (onSearchResults) {
          onSearchResults([]);
        }
      }
    } catch (err) {
      setError(handleApiError(err));
      setArticles([]);
      if (onSearchResults) {
        onSearchResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const loadTopHeadlines = async () => {
    setIsLoading(true);
    setError(null);
    setShowAllArticles(false);

    try {
      const response = await newsAPI.getTopHeadlines();
      if (response.articles) {
        const normalizedArticles = response.articles.map(normalizeArticle);
        setArticles(normalizedArticles);
      } else {
        setArticles([]);
      }
    } catch (err) {
      setError(handleApiError(err));

      const { mockNewsData: fallbackData } = await import("../../utils");
      const normalizedMockData = fallbackData.map(normalizeArticle);
      setArticles(normalizedMockData.slice(0, 6));
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, articles.length));
  };

  // Show preloader when loading
  if (isLoading) {
    return (
      <section className="search-results">
        <div className="search-results__container">
          <Preloader />
        </div>
      </section>
    );
  }

  // Don't render anything if user hasn't searched
  if (!hasSearched) {
    return null;
  }

  return (
    <section className="search-results">
      <div className="search-results__container">
        {/* Search Results Header */}
        {articles.length > 0 && (
          <div className="search-results__header">
            <h2 className="search-results__title">
              {error ? "Search Results" : `Search results for "${searchQuery}"`}
            </h2>
            {!error && (
              <p className="search-results__subtitle">
                {articles.length} {articles.length === 1 ? "result" : "results"}
              </p>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="search-results__error">
            <p>{error}</p>
          </div>
        )}

        {/* No Results State */}
        {!error && !isLoading && articles.length === 0 && hasSearched && (
          <div className="search-results__no-results">
            <img
              src={notFoundIcon}
              alt="Nothing found"
              className="search-results__no-results-icon"
            />
            <h3 className="search-results__no-results-title">Nothing found</h3>
            <p className="search-results__no-results-text">
              Sorry, but nothing matched your search terms.
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {!error && articles.length > 0 && (
          <>
            <div className="search-results__grid">
              {articlesToShow.map((article, index) => (
                <NewsCard
                  key={article.url || index}
                  date={article.date}
                  title={article.title}
                  description={article.description}
                  source={article.source}
                  imageUrl={article.imageUrl}
                  url={article.url}
                  article={article}
                  isLoggedIn={isLoggedIn}
                  isSaved={savedArticles.some(
                    (saved) =>
                      saved.link === article.url || saved._id === article.id
                  )}
                  onSave={onSaveArticle}
                  onRemove={onRemoveArticle}
                  onSignInClick={onSignInClick}
                />
              ))}
            </div>

            {/* Show More Button */}
            {hasMoreArticles && (
              <div className="search-results__show-more-container">
                <button
                  className="search-results__show-more"
                  onClick={handleShowMore}
                >
                  Show more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default SearchResults;
