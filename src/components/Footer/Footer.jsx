import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import githubIcon from "../../assets/images/github.png";
import linkedinIcon from "../../assets/images/linkedin.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2025 Amin Hijaz, Powered by News API
        </p>
        <div className="footer__links">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a
            href="https://tripleten.com"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
          <div className="footer__social-links">
            <a
              href="https://github.com/Ahijaz1"
              className="footer__social-link"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={githubIcon}
                alt="GitHub"
                className="footer__social-icon"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/aminhijaz/"
              className="footer__social-link"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedinIcon}
                alt="LinkedIn"
                className="footer__social-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
