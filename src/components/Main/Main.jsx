import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";

export default function Main({ onSearch }) {
  return (
    <main className="main">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">What's going on in the world?</h1>
          <p className="hero-subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      </div>
    </main>
  );
}
