// Mock news data for development
export const mockNewsData = [
  {
    id: 1,
    date: "November 4, 2020",
    title: "Everyone Needs a Special 'Sit Spot' in Nature",
    description:
      "Ever since I read Richard Louv's influential book, 'Last Child in the Woods,' the idea of having a special 'sit spot' in nature has fascinated me. This concept, which Louv borrowed from Indigenous traditions, involves finding a place in the natural world where you can sit quietly and observe.",
    source: "Nature.com",
    imageUrl: null,
  },
  {
    id: 2,
    date: "November 4, 2020",
    title: "Nature makes you better",
    description:
      "We all know how good nature can make us feel. We have known it for millennia. The sounds of the forest, the scent of the trees, the sunlight playing through the leaves, the fresh, clean air — these things give us a sense of comfort. They ease our stress and worry, help us to relax and to think more clearly. Being in nature can restore our mood, give us back our energy and vitality.",
    source: "National Geographic",
    imageUrl: null,
  },
  {
    id: 3,
    date: "November 4, 2020",
    title: "Grand Canyon",
    description:
      "The Grand Canyon is a steep-sided canyon carved by the Colorado River in Arizona, United States. The Grand Canyon is 277 miles (446 km) long, up to 18 miles (29 km) wide and attains a depth of over a mile (6,093 feet or 1,857 meters).",
    source: "National Park Service",
    imageUrl: null,
  },
  {
    id: 4,
    date: "November 5, 2020",
    title: "Yellowstone National Park",
    description:
      "Yellowstone National Park is an American national park located in the western United States, largely in the northwest corner of Wyoming and extending into Montana and Idaho. It was established by the 42nd U.S. Congress with the Yellowstone National Park Protection Act.",
    source: "National Park Service",
    imageUrl: null,
  },
  {
    id: 5,
    date: "November 6, 2020",
    title: "Forests are the lungs of our planet",
    description:
      "Forests are essential for life on Earth. They provide oxygen, store carbon dioxide, and house countless species. These ecosystems are crucial for maintaining the planet's climate balance and supporting biodiversity.",
    source: "Environmental Times",
    imageUrl: null,
  },
  {
    id: 6,
    date: "November 7, 2020",
    title: "The healing power of water",
    description:
      "From ancient civilizations to modern science, water has been recognized for its therapeutic properties. Whether it's the sound of ocean waves, the sight of a flowing river, or the feel of rain on your skin, water has a profound effect on human well-being.",
    source: "Health & Nature",
    imageUrl: null,
  },
];

// Date formatting utility
export const formatDate = (dateString) => {
  if (!dateString) return "No date";

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    // Format as "Month Day, Year" (e.g., "November 4, 2020")
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  } catch {
    return "Invalid date";
  }
};

// Backend Response Simulation///

// Mock users database
const mockUsers = [
  {
    id: 1,
    email: "user@example.com",
    password: "password123",
    name: "John Doe",
  },
  {
    id: 2,
    email: "jane@example.com",
    password: "password456",
    name: "Jane Smith",
  },
];

// Mock saved articles storage
let mockSavedArticles = [];

// Generate mock JWT token
const generateMockToken = (userId) => {
  return `mock_token_${userId}_${Date.now()}`;
};

// Simulate login API
export const mockLogin = async (email, password) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = generateMockToken(user.id);

  // Store token in localStorage
  localStorage.setItem("authToken", token);
  localStorage.setItem("userId", user.id.toString());
  localStorage.setItem("userName", user.name);

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  };
};

// Simulate registration API call
export const mockRegister = async (email, password, name) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Check if user already exists
  const existingUser = mockUsers.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Create new user
  const newUser = {
    id: mockUsers.length + 1,
    email,
    password,
    name,
  };

  mockUsers.push(newUser);

  const token = generateMockToken(newUser.id);

  // Store token in localStorage
  localStorage.setItem("authToken", token);
  localStorage.setItem("userId", newUser.id.toString());
  localStorage.setItem("userName", newUser.name);

  return {
    success: true,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
    token,
  };
};

// Check if user is authenticated
export const checkAuth = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  if (!token || !userId) {
    throw new Error("No valid authentication token found");
  }

  // In a real app, you'd validate the token with the backend
  // For simulation, we just check if token exists and has correct format
  if (!token.startsWith("mock_token_")) {
    throw new Error("Invalid token format");
  }

  return {
    success: true,
    user: {
      id: parseInt(userId),
      name: userName,
    },
    token,
  };
};

// Logout user
export const mockLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");

  return { success: true };
};

// Save article to user's saved articles
export const mockSaveArticle = async (article) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    throw new Error("Authentication required");
  }

  // Create saved article object
  const savedArticle = {
    id: `saved_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId: parseInt(userId),
    articleId: article.url || article.id,
    title: article.title,
    description: article.description,
    source: article.source,
    imageUrl: article.imageUrl,
    date: article.date,
    url: article.url,
    keyword: article.keyword || "nature", // Default keyword
    savedAt: new Date().toISOString(),
  };

  // Check if already saved
  const alreadySaved = mockSavedArticles.find(
    (saved) =>
      saved.articleId === savedArticle.articleId &&
      saved.userId === savedArticle.userId
  );

  if (alreadySaved) {
    throw new Error("Article already saved");
  }

  mockSavedArticles.push(savedArticle);

  // Also save to localStorage for persistence
  localStorage.setItem("savedArticles", JSON.stringify(mockSavedArticles));

  return {
    success: true,
    article: savedArticle,
  };
};

// Remove article from saved articles
export const mockRemoveArticle = async (articleId) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    throw new Error("Authentication required");
  }

  const initialLength = mockSavedArticles.length;
  mockSavedArticles = mockSavedArticles.filter(
    (saved) =>
      !(saved.articleId === articleId && saved.userId === parseInt(userId))
  );

  if (mockSavedArticles.length === initialLength) {
    throw new Error("Article not found in saved articles");
  }

  // Update localStorage
  localStorage.setItem("savedArticles", JSON.stringify(mockSavedArticles));

  return {
    success: true,
    message: "Article removed successfully",
  };
};

// Get user's saved articles
export const mockGetSavedArticles = async () => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    throw new Error("Authentication required");
  }

  // Load from localStorage if available
  const storedArticles = localStorage.getItem("savedArticles");
  if (storedArticles) {
    try {
      mockSavedArticles = JSON.parse(storedArticles);
    } catch (error) {
      console.error("Failed to parse saved articles from localStorage:", error);
    }
  }

  const userSavedArticles = mockSavedArticles.filter(
    (saved) => saved.userId === parseInt(userId)
  );

  return {
    success: true,
    articles: userSavedArticles,
  };
};
