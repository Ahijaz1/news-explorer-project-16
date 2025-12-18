import React, { useState, useEffect } from "react";
import "./LoginModal.css";

export default function LoginModal({ isOpen, onClose, onLogin, onSignUp }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

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
      await onLogin(formData.email, formData.password);

      // Reset form on success
      setFormData({ email: "", password: "" });
      onClose(); // Closes on a successful login
    } catch (error) {
      setErrors({
        general: error.message || "Login failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal">
        <div className="login-modal-header">
          <h2 className="login-modal-title">Sign in</h2>
          <button className="login-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
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
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
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

          {errors.general && (
            <div className="error-message error-message--general">
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            or{" "}
            <button type="button" className="Sign-up-link" onClick={onSignUp}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
