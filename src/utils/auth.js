// Authentication API simulation
import {
  mockLogin,
  mockRegister,
  mockLogout,
  checkAuth,
  mockSaveArticle,
  mockRemoveArticle,
  mockGetSavedArticles,
} from "./index";

// Auth API class for managing authentication
class AuthAPI {
  constructor() {
    this.baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.nomoreparties.co/v1/wtwr"
        : "http://localhost:3000/api";
  }

  // Login user
  async login(email, password) {
    try {
      return await mockLogin(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Register new user
  async register(email, password, name) {
    try {
      return await mockRegister(email, password, name);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Check if user is authenticated
  async checkToken() {
    try {
      return await checkAuth();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Logout user
  logout() {
    return mockLogout();
  }

  // Save article for user
  async saveArticle(article) {
    try {
      return await mockSaveArticle(article);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Remove saved article
  async removeArticle(articleId) {
    try {
      return await mockRemoveArticle(articleId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get user's saved articles
  async getSavedArticles() {
    try {
      return await mockGetSavedArticles();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Check if article is saved by user
  async isArticleSaved(articleId) {
    try {
      const response = await this.getSavedArticles();
      return response.articles.some(
        (article) => article.articleId === articleId
      );
    } catch (error) {
      return false;
    }
  }
}

// Create and export singleton instance
export const authAPI = new AuthAPI();

// Export individual methods for convenience
export {
  mockLogin,
  mockRegister,
  mockLogout,
  checkAuth,
  mockSaveArticle,
  mockRemoveArticle,
  mockGetSavedArticles,
};
