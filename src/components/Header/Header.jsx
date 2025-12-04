import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import "./Header.css";
import menuIcon from "../../assets/images/menu.png";

export default function Header({
  isLoggedIn,
  username,
  onLogin,
  onRegister,
  onLogout,
}) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleSignInClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Closes the mobile menu when i open it //
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleLogin = async (email, password) => {
    try {
      await onLogin(email, password);
      setIsLoginModalOpen(false);
    } catch (error) {
      // Error will be handled by the modal
      throw error;
    }
  };

  const handleRegister = async (email, password, name) => {
    try {
      await onRegister(email, password, name);
      setIsRegisterModalOpen(false);
    } catch (error) {
      // Error will be handled by the modal
      throw error;
    }
  };

  const handleSignUp = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSignIn = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="header-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <header
        className={
          location.pathname === "/saved-articles"
            ? "header header--light"
            : isLoggedIn
              ? "header"
              : "header-dark"
        }
      >
        <div className="header-container">
          <Link to="/" className="header-logo">
            NewsExplorer
          </Link>

          {/* Yummy hamburger menu button for mobile */}
          <button
            className={`header-menu-btn ${isMobileMenuOpen ? "header-menu-btn--hidden" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <img src={menuIcon} alt="Menu" className="header-menu-icon" />
          </button>

          <Navigation
            isLoggedIn={isLoggedIn}
            username={username}
            onLogout={onLogout}
            isMobileMenuOpen={isMobileMenuOpen}
            onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
            onSignInClick={handleSignInClick}
          />
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseModal}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseModal}
        onRegister={handleRegister}
        onSignIn={handleSignIn}
      />
    </>
  );
}
