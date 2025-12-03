import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SearchResults from "../SearchResults/SearchResults";
import SavedArticles from "../SavedArticles/SavedArticles";
import About from "../About/About";
import Footer from "../Footer/Footer";
import { authorize, register, checkToken } from "../../utils/auth-simple";
import { getItems, saveArticle, deleteArticle } from "../../utils/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await checkToken(token);
          setIsLoggedIn(true);
          setUsername(response.data.name);

          // Load saved articles for authenticated user
          try {
            const savedArticlesList = await getItems();
            setSavedArticles(savedArticlesList);
          } catch (error) {}
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setUsername("");
        setSavedArticles([]);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await authorize(email, password);
      localStorage.setItem("authToken", response.token);
      setIsLoggedIn(true);
      setUsername(response.user.name);

      // Load saved articles for the logged-in user
      try {
        const savedArticlesList = await getItems();
        setSavedArticles(savedArticlesList);
      } catch (error) {}

      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (email, password, name) => {
    try {
      const response = await register(email, password, name);
      localStorage.setItem("authToken", response.token);
      setIsLoggedIn(true);
      setUsername(response.user.name);
      setSavedArticles([]);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUsername("");
    setSavedArticles([]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSearchResults = (articles) => {
    setSearchResults(articles);
  };

  const handleSaveArticle = async (article) => {
    if (!isLoggedIn) {
      throw new Error("Please log in to save articles");
    }

    try {
      const savedArticle = await saveArticle(article);
      setSavedArticles((prev) => [...prev, savedArticle]);
      return savedArticle;
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveArticle = async (article) => {
    if (!isLoggedIn) {
      throw new Error("Please log in to manage saved articles");
    }

    try {
      await deleteArticle(article);

      const articleUrl = article.link || article.url;
      setSavedArticles((prev) =>
        prev.filter((saved) => (saved.link || saved.url) !== articleUrl)
      );
    } catch (error) {
      throw error;
    }
  };

  // Show loading spinner //
  if (isCheckingAuth) {
    return <div className="app__loading">Loading...</div>;
  }

  return (
    <Router>
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main onSearch={handleSearch} />
              <SearchResults
                searchQuery={searchQuery}
                isLoggedIn={isLoggedIn}
                onSaveArticle={handleSaveArticle}
                onRemoveArticle={handleRemoveArticle}
                savedArticles={savedArticles}
                onSearchResults={handleSearchResults}
                onSignInClick={() => {}}
              />
              <About />
            </>
          }
        />
        <Route
          path="/saved-articles"
          element={
            <SavedArticles
              isLoggedIn={isLoggedIn}
              username={username}
              savedArticles={savedArticles}
              onRemoveArticle={handleRemoveArticle}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
