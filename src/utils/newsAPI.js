const API_KEY = "8dbe7dcc29fa498caea541c4706e07c4";

// Handle environment-based URL
/* eslint-disable no-undef */
const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const topHeadlinesUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/top-headlines"
    : "https://newsapi.org/v2/top-headlines";
/* eslint-enable no-undef */

// Utility function to get date 7 days ago
const getDateSevenDaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

// Utility function to get current date
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

// API endpoints
export const newsAPI = {
  // Search for articles with proper parameters
  searchArticles: async (query) => {
    if (!query || query.trim() === "") {
      throw new Error("Please enter a keyword");
    }

    const params = new URLSearchParams({
      q: query.trim(),
      apiKey: API_KEY,
      from: getDateSevenDaysAgo(),
      to: getCurrentDate(),
      pageSize: 100, // Maximum allowed in free version
      language: "en",
      sortBy: "relevancy",
    });

    const response = await fetch(`${newsApiBaseUrl}?${params}`);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      } else if (response.status === 401) {
        throw new Error("Invalid API key. Please check your credentials.");
      } else if (response.status === 400) {
        throw new Error("Invalid request parameters.");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.message || "API returned an error");
    }

    return data;
  },

  // Get top headlines
  getTopHeadlines: async () => {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      country: "us",
      pageSize: 20,
    });

    const response = await fetch(`${topHeadlinesUrl}?${params}`);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      } else if (response.status === 401) {
        throw new Error("Invalid API key. Please check your credentials.");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.message || "API returned an error");
    }

    return data;
  },
};

// Error handler for consistent error messaging
export const handleApiError = (error) => {
  if (error.message && error.message.includes("429")) {
    return "API rate limit reached. Please try again later.";
  } else if (error.message && error.message.includes("401")) {
    return "API authentication failed. Please check your API key.";
  } else if (error.message && error.message.includes("Network")) {
    return "Network error. Please check your internet connection.";
  } else if (error.message && error.message.includes("keyword")) {
    return error.message;
  } else {
    return "Failed to fetch articles. Please try again.";
  }
};
