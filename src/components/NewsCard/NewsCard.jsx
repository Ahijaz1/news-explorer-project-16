import React, { useState } from "react";
import "./NewsCard.css";
import trashIcon from "../../assets/images/trash.png";
import bookmarkIcon from "../../assets/images/unsavedbk.png"; // Unsaved bookmark
import bookmarkSavedIcon from "../../assets/images/bluebk.png"; // Saved bookmark
import bookmarkHoverIcon from "../../assets/images/savedbk.png"; // Hover state
import placeholderImage from "../../assets/images/not-found_v1.png"; // Placeholder image

// BookmarkIcon Component - Using image instead of SVG
const BookmarkIcon = ({ saved = false, isHovered = false }) => (
  <img
    src={
      saved ? bookmarkSavedIcon : isHovered ? bookmarkHoverIcon : bookmarkIcon
    }
    alt={saved ? "Saved" : "Save"}
    className="news-card__save-icon"
  />
);

// TrashIcon //
const TrashIcon = () => (
  <img src={trashIcon} alt="Delete" className="news-card__trash-icon" />
);

export default function NewsCard({
  date,
  title,
  description,
  source,
  imageUrl,
  url,
  isLoggedIn = false,
  isSaved = false,
  onSave,
  onRemove,
  category,
  onSignInClick,
  article,
}) {
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (!imageUrl || imageUrl.trim() === "" || imageError) {
      return placeholderImage;
    }
    // Check if the URL is valid
    try {
      new URL(imageUrl);
      return imageUrl;
    } catch {
      return placeholderImage;
    }
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      if (onSignInClick) {
        onSignInClick();
      }
      return;
    }

    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      if (isSaved && onRemove) {
        await onRemove(
          article || { url, title, description, source, imageUrl, date }
        );
      } else if (onSave) {
        await onSave(
          article || { url, title, description, source, imageUrl, date }
        );
      }
    } catch (error) {
      console.error("Error saving/removing article:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCardClick = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article className="news-card" onClick={handleCardClick}>
      {/* Category tag for saved articles page */}
      {isSaved && !onSave && category && (
        <div className="news-card__category-tag">{category}</div>
      )}

      {/* Save/Delete Button */}
      <button
        onClick={handleSaveClick}
        disabled={isSaving}
        className={`news-card__save-btn ${
          isSaved && !onSave
            ? "news-card__save-btn--delete"
            : isSaved && onSave
              ? "news-card__save-btn--saved"
              : !isLoggedIn
                ? "news-card__save-btn--inactive"
                : ""
        }`}
        onMouseEnter={() => !isSaving && setIsIconHovered(true)}
        onMouseLeave={() => setIsIconHovered(false)}
        aria-label={isSaved ? "Remove from saved" : "Save article"}
      >
        {isSaving ? (
          <div className="news-card__spinner" />
        ) : isSaved && !onSave ? (
          <TrashIcon />
        ) : (
          <BookmarkIcon saved={isSaved} isHovered={isIconHovered} />
        )}
      </button>

      {/* Delete tooltip for saved articles page */}
      {isSaved && !onSave && isIconHovered && !isSaving && (
        <div className="news-card__delete-tooltip">Remove from saved</div>
      )}

      {/* Sign in tooltip for non-logged-in users */}
      {!isLoggedIn && isIconHovered && !isSaving && (
        <div className="news-card__signin-tooltip">
          Sign in to save articles
        </div>
      )}

      <div className="news-card__image-container">
        <img
          src={getImageSrc()}
          alt={title || "Article"}
          className="news-card__image"
          onError={handleImageError}
        />
      </div>

      <div className="news-card__content">
        <time className="news-card__date">{date || "No date"}</time>
        <h3 className="news-card__title">{title || "No title available"}</h3>
        <p className="news-card__description">
          {description || "No description available"}
        </p>
        <div className="news-card__content-footer">
          <span className="news-card__source">{source || "No source"}</span>
        </div>
      </div>
    </article>
  );
}
