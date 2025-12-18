import React, { useState, useEffect, useCallback } from "react";
import "./RegisterModal.css";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSignIn,
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);

  const handleClose = useCallback(() => {
    setIsRegistrationSuccessful(false);
    setFormData({ username: "", email: "", password: "" });
    setErrors({});
    onClose();
  }, [onClose]);

  // Handle Escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await onRegister(formData.email, formData.password, formData.username);

      // Set success state
      setIsRegistrationSuccessful(true);

      // Reset form
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      setErrors({
        general: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSignInClick = () => {
    setIsRegistrationSuccessful(false);
    onSignIn();
  };

  if (!isOpen) return null;

  return (
    <div className="register-modal-overlay" onClick={handleOverlayClick}>
      <div className="register-modal">
        {isRegistrationSuccessful ? (
          // Success View
          <>
            <div className="register-modal-header">
              <button className="register-modal-close" onClick={handleClose}>
                ✕
              </button>
            </div>
            <div className="register-success">
              <h2 className="register-success-title">
                Registration successfully completed!
              </h2>
              <button
                type="button"
                className="sign-in-success-link"
                onClick={handleSignInClick}
              >
                Sign in
              </button>
            </div>
          </>
        ) : (
          // Registration Form
          <>
            <div className="register-modal-header">
              <h2 className="register-modal-title">Sign up</h2>
              <button className="register-modal-close" onClick={handleClose}>
                ✕
              </button>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="register-email">
                  Email
                </label>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  className={`form-input ${errors.email ? "form-input-error" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="register-password">
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  className={`form-input ${errors.password ? "form-input-error" : ""}`}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={`form-input ${errors.username ? "form-input-error" : ""}`}
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />
                {errors.username && (
                  <span className="error-message">{errors.username}</span>
                )}
              </div>

              {errors.general && (
                <div className="error-message error-message--general">
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                className="register-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign up"}
              </button>
            </form>

            <div className="register-footer">
              <p>
                or{" "}
                <button
                  type="button"
                  className="sign-in-link"
                  onClick={onSignIn}
                >
                  Sign in
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
