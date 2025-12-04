import React, { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/images/close.png";

export default function ModalWithForm({
  isOpen,
  onClose,
  title,
  buttonText,
  children,
  onSubmit,
  isLoading = false,
}) {
  // Handle Escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle overlay click (click outside modal)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__container">
        <button
          className="modal__close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <div className="modal__content">
          <h2 className="modal__title">{title}</h2>

          <form className="modal__form" onSubmit={onSubmit}>
            {children}

            <button
              type="submit"
              className="modal__submit-btn"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
