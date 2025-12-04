import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import logoutIcon from "../../assets/images/logout.png";
import logoutWhiteIcon from "../../assets/images/logoutwhite.png";
import closeIcon from "../../assets/images/back.png";

export default function Navigation({
  isLoggedIn,
  username,
  onLogout,
  isMobileMenuOpen,
  onCloseMobileMenu,
  onSignInClick,
}) {
  const location = useLocation();

  return (
    <nav className={`header-nav ${isMobileMenuOpen ? "header-nav--open" : ""}`}>
      {/* Close button for mobile menu */}
      <button
        className="header-nav-close"
        onClick={onCloseMobileMenu}
        aria-label="Close menu"
      >
        <img src={closeIcon} alt="Close" className="header-nav-close-icon" />
      </button>

      <Link to="/" className="header-nav-link" onClick={onCloseMobileMenu}>
        Home
      </Link>
      {isLoggedIn ? (
        <>
          <Link
            to="/saved-articles"
            className="header-nav-link"
            onClick={onCloseMobileMenu}
          >
            Saved articles
          </Link>
          <button className="header-profile-btn" onClick={onLogout}>
            {username}{" "}
            <img
              src={
                location.pathname === "/saved-articles"
                  ? logoutIcon
                  : logoutWhiteIcon
              }
              alt="Logout"
              className="header-logout-icon"
            />
          </button>
        </>
      ) : (
        <button className="header-sign-in-btn" onClick={onSignInClick}>
          Sign in
        </button>
      )}
    </nav>
  );
}
