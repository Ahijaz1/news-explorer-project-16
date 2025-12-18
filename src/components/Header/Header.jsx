import React, { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Change header background after scrolling 100px
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    await onLogin(email, password);
    setIsLoginModalOpen(false);
  };

  const handleRegister = async (email, password, name) => {
    await onRegister(email, password, name);
    setIsRegisterModalOpen(false);
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
          className="header__menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <header
        className={
          location.pathname === "/saved-articles"
            ? "header header--light"
            : isScrolled || isLoggedIn
              ? "header header--scrolled"
              : "header header--dark"
        }
      >
        <div className="header__container">
          <Link to="/" className="header__logo">
            NewsExplorer
          </Link>

          {/* Yummy hamburger menu button for mobile */}
          <button
            className={`header__menu-btn ${isMobileMenuOpen ? "header__menu-btn--hidden" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <img src={menuIcon} alt="Menu" className="header__menu-icon" />
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
