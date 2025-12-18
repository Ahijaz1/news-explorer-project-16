import { authorize, register, checkToken } from "./auth-simple.js";
import { getItems, saveArticle, deleteArticle, checkIfSaved } from "./api.js";

async function demoLogin() {
  console.log("--- Testing Login ---");
  try {
    const response = await authorize("test@example.com", "password123");
    console.log("Login successful:", response);

    // Store token for subsequent requests
    localStorage.setItem("authToken", response.token);
    console.log("Token stored:", response.token);
  } catch (error) {
    console.error("Login failed:", error.message);
  }
}

async function demoRegister() {
  console.log("\n--- Testing Register ---");
  try {
    const response = await register(
      "newuser@example.com",
      "password789",
      "New User"
    );
    console.log("Registration successful:", response);
  } catch (error) {
    console.error("Registration failed:", error.message);
  }
}

async function demoCheckAuth() {
  console.log("\n--- Testing Token Check ---");
  try {
    const token = localStorage.getItem("authToken");
    const response = await checkToken(token);
    console.log("User is authenticated:", response);
  } catch (error) {
    console.log("User is not authenticated:", error.message);
  }
}

async function demoGetSavedItems() {
  console.log("\n--- Testing Get Saved Articles ---");
  try {
    const articles = await getItems();
    console.log("✅ Saved articles retrieved:", articles);
  } catch (error) {
    console.error("❌ Failed to get saved articles:", error.message);
  }
}

async function demoSaveArticle() {
  console.log("\n--- Testing Save Article ---");
  try {
    const mockArticle = {
      title: "Test Article from Demo",
      description: "This is a test article for the demo",
      url: "https://example.com/test-article",
      urlToImage: "https://example.com/test-image.jpg",
      source: { name: "Test Source" },
      publishedAt: "2025-11-13T12:00:00Z",
    };

    const savedArticle = await saveArticle(mockArticle);
    console.log("✅ Article saved:", savedArticle);
  } catch (error) {
    console.error("❌ Failed to save article:", error.message);
  }
}

async function demoCheckIfSaved() {
  console.log("\n--- Testing Check If Saved ---");
  try {
    const isAlreadySaved = await checkIfSaved(
      "https://example.com/test-article"
    );
    console.log("✅ Article save status checked:", isAlreadySaved);
  } catch (error) {
    console.error("❌ Failed to check save status:", error.message);
  }
}

async function demoDeleteArticle() {
  console.log("\n--- Testing Delete Article ---");
  try {
    // Get saved articles to find one to delete
    const articles = await getItems();

    if (articles.length > 0) {
      const articleToDelete = articles[articles.length - 1]; // Delete the last one
      const response = await deleteArticle(articleToDelete._id);
      console.log("✅ Article deleted:", response);
    } else {
      console.log("ℹ️  No articles to delete");
    }
  } catch (error) {
    console.error("❌ Failed to delete article:", error.message);
  }
}

// Main demo function
export async function runSimpleBackendDemo() {
  console.log("🚀 === Simple Backend API Demo ===\n");

  // Test authentication flow
  await demoLogin();
  await demoCheckAuth();

  // Test article management
  await demoGetSavedItems();
  await demoSaveArticle();
  await demoCheckIfSaved();
  await demoGetSavedItems(); // Check articles again after save
  await demoDeleteArticle();
  await demoGetSavedItems(); // Check articles after delete

  // Test registration
  await demoRegister();

  console.log("\n✨ === Demo Complete ===");
  console.log(
    "💡 To run this demo, open browser console and call: runSimpleBackendDemo()"
  );
}

// Export individual test functions for manual testing
export {
  demoLogin,
  demoRegister,
  demoCheckAuth,
  demoGetSavedItems,
  demoSaveArticle,
  demoDeleteArticle,
};

// Auto-run demo (uncomment to test)
// runSimpleBackendDemo();
