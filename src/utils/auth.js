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
    /* eslint-disable no-undef */
    this.baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.nomoreparties.co/v1/wtwr"
        : "http://localhost:3000/api";
    /* eslint-enable no-undef */
  }

  // Login user
  async login(email, password) {
    return await mockLogin(email, password);
  }

  // Register new user
  async register(email, password, name) {
    return await mockRegister(email, password, name);
  }

  // Check if user is authenticated
  async checkToken() {
    return await checkAuth();
  }

  // Logout user
  logout() {
    return mockLogout();
  }

  // Save article for user
  async saveArticle(article) {
    return await mockSaveArticle(article);
  }

  // Remove saved article
  async removeArticle(articleId) {
    return await mockRemoveArticle(articleId);
  }

  // Get user's saved articles
  // Get user's saved articles
  async getSavedArticles() {
    return await mockGetSavedArticles();
  }

  // Check if article is saved by user
  async isArticleSaved(articleId) {
    try {
      const response = await this.getSavedArticles();
      return response.articles.some(
        (article) => article.articleId === articleId
      );
    } catch {
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
