import axios from "axios";
import { BACKEND_URL, API_VERSION } from "../config";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export const authService = {
  signup: async (username: string, email: string, password: string) => {
    try {
      const response = await api.post("/signup", { username, email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed";
      console.error("Signup error:", error.response?.data || error);
      throw new Error(message);
    }
  },

  signin: async (username: string, password: string) => {
    try {
      const response = await api.post("/signin", { username, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Signin failed";
      console.error("Signin error:", error.response?.data || error);
      throw new Error(message);
    }
  },

  signout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!(token && user);
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export const contentService = {
  getContent: async () => {
    try {
      const response = await api.get("/content");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch content"
      );
    }
  },

  addContent: async (content: {
    link: string;
    type: string;
    title: string;
  }) => {
    try {
      const response = await api.post("/content", content);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to add content");
    }
  },

  deleteContent: async (_id: string) => {
    try {
      const response = await api.delete("/content", { data: { _id } });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete content"
      );
    }
  },
};

export default api;
