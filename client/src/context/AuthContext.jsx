import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as AuthApi from "../services/auth/authApi";
import api from "../services/api"; // ← ADD THIS IMPORT

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        
        // Check for refresh token (user was logged in)
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("🔄 initAuth - refreshToken:", refreshToken ? "✅ Present" : "❌ Missing");
        
        if (!refreshToken) {
          console.log("No refresh token, user not logged in");
          setLoading(false);
          return;
        }

        // Try to get user from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          console.log("📦 Found stored user:", JSON.parse(storedUser));
          setUser(JSON.parse(storedUser));
        }

        // Fetch fresh profile (access token sent via cookie)
        try {
          console.log("📡 Fetching profile...");
          const userData = await AuthApi.getProfile();
          console.log("📡 Profile fetched:", userData);
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } catch (profileError) {
          console.error("❌ Profile fetch failed:", profileError);
          
          // If 403, use stored user as fallback
          if (profileError.status === 403) {
            console.log("Using stored user as fallback for 403");
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          } else {
            // Clear everything for other errors
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login
  const login = useCallback(async (credentials) => {
    try {
      setError(null);
      
      const res = await AuthApi.login(credentials);
      console.log("Login response:", res);

      // Store the refresh token only (access token is in HTTP-only cookie)
      if (res.refreshToken) {
        localStorage.setItem("refreshToken", res.refreshToken);
        console.log("✅ Refresh token stored in localStorage");
      } else {
        console.warn("⚠️ No refreshToken in response!");
      }

      // Store user data
      const userData = {
        email: res.email,
        fullName: res.fullName,
        role: res.role,
        profileImage: res.profileImage,
        id: res.email
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("✅ User data stored:", userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed");
      return { success: false, error: error.message };
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await AuthApi.logout(refreshToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
      setError(null);
    }
  }, []);

  // Avatar upload
  const uploadAvatar = useCallback(async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await api.post("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      // Update user with new profile image
      if (response.data.profileImage) {
        setUser(prev => ({
          ...prev,
          profileImage: response.data.profileImage
        }));
        
        // Update localStorage
        if (user) {
          const updatedUser = {
            ...user,
            profileImage: response.data.profileImage
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Upload error:", error);
      return { success: false, error: error.message };
    }
  }, [user]);

  // Delete avatar
  const deleteAvatar = useCallback(async () => {
    try {
      const response = await api.delete("/users/avatar");
      
      // Update user
      setUser(prev => ({
        ...prev,
        profileImage: null
      }));
      
      // Update localStorage
      if (user) {
        const updatedUser = {
          ...user,
          profileImage: null
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Delete error:", error);
      return { success: false, error: error.message };
    }
  }, [user]);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    uploadAvatar,
    deleteAvatar,
    hasRole: (role) => user?.role === role,
    isAuthenticated: !!user,
    isStudent: user?.role === "STUDENT",
    isProfessor: user?.role === "PROFESSOR",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default AuthContext;