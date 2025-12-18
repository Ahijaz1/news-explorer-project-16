import NewsCard from "../NewsCard/NewsCard";
import "./SavedArticles.css";

function SavedArticles({
  isLoggedIn = false,
  username = "User",
  savedArticles = [],
  onRemoveArticle,
}) {
  const handleRemoveArticle = (articleToRemove) => {
    if (onRemoveArticle) {
      onRemoveArticle(articleToRemove);
    }
  };

  // Get unique keywords from saved articles
  const getKeywords = () => {
    if (savedArticles.length === 0) return [];

    // Extract keywords from saved articles
    const keywords = savedArticles
      .map((article) => article.keyword)
      .filter(Boolean);

    const uniqueKeywords = [...new Set(keywords)];
    return uniqueKeywords;
  };

  const keywords = getKeywords();
  const displayKeywords = keywords.slice(0, 2);
  const remainingCount = Math.max(0, keywords.length - 2);

  if (!isLoggedIn) {
    return (
      <main>
        <section className="saved-articles">
          <div className="saved-articles__container">
            <div className="saved-articles__login-prompt">
              <h2>Please sign in to view your saved articles</h2>
              <p>
                Create an account to save and organize your favorite news
                articles.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="saved-articles">
        <div className="saved-articles__container">
          <div className="saved-articles__header">
            <p className="saved-articles__breadcrumb">Saved articles</p>
            <h1 className="saved-articles__title">
              {username}, you have {savedArticles.length} saved articles
            </h1>

            {keywords.length > 0 && (
              <p className="saved-articles__keywords">
                By keywords: {displayKeywords.join(", ")}
                {remainingCount > 0 &&
                  `, and ${remainingCount} other${remainingCount > 1 ? "s" : ""}`}
              </p>
            )}
          </div>

          {savedArticles.length === 0 ? (
            <div className="saved-articles__empty">
              <h2>No saved articles yet</h2>
              <p>Start exploring and save articles that interest you!</p>
            </div>
          ) : (
            <ul className="saved-articles__grid">
              {savedArticles.map((article, index) => {
                // Ensure imageUrl is a valid string
                const imageUrl = article.image || article.imageUrl || "";
                const imageUrlString =
                  typeof imageUrl === "string" ? imageUrl : "";

                return (
                  <li key={`${article._id || article.id}-${index}`}>
                    <NewsCard
                      date={article.date}
                      title={article.title}
                      description={article.description || article.text}
                      source={article.source}
                      imageUrl={imageUrlString}
                      url={article.link || article.url}
                      isLoggedIn={isLoggedIn}
                      isSaved={true}
                      onRemove={() => handleRemoveArticle(article)}
                      category={article.keyword}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default SavedArticles;
