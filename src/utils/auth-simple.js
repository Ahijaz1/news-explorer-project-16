export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject(new Error("Email and password are required"));
        return;
      }

      if (password.length < 6) {
        reject(new Error("Invalid email or password"));
        return;
      }

      resolve({
        token: `fake-token-${Date.now()}`,
        user: {
          name: email.split("@")[0], // Extract name from email
          email: email,
          _id: `fake-id-${Math.random().toString(36).substr(2, 9)}`,
        },
      });
    }, 800);
  });
};

export const register = (email, password, name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password || !name) {
        reject(new Error("All fields are required"));
        return;
      }

      if (password.length < 6) {
        reject(new Error("Password must be at least 6 characters"));
        return;
      }

      resolve({
        token: `fake-token-${Date.now()}`,
        user: {
          name: name,
          email: email,
          _id: `fake-id-${Math.random().toString(36).substr(2, 9)}`,
        },
      });
    }, 1000);
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!token || !token.startsWith("fake-token")) {
        reject(new Error("Invalid token"));
        return;
      }

      resolve({
        data: {
          name: "fake user",
          email: "fake@example.com",
          _id: "fake-id-12345",
        },
      });
    }, 500);
  });
};
