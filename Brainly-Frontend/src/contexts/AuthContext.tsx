import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/api";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signin: (username: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
          // Verify token is still valid
          const response = await authService.getCurrentUser();
          if (response) {
            setUser(response);
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }
        }
      } catch (e) {
        console.error("Auth check error:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signin = async (username: string, password: string) => {
    try {
      setError(null);
      const response = await authService.signin(username, password);
      if (response.success) {
        setUser(response.user);
        return true;
      } else {
        setError(response.message || "Sign in failed");
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      setError(null);
      const response = await authService.signup(username, email, password);
      if (response.success) {
        setUser(response.user);
        return true;
      } else {
        setError(response.message || "Sign up failed");
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
