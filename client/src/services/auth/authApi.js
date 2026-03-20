import api from "../api";

const handleError = (error) => {
  if (error.response) {
    return {
      message: error.response.data.message || "An error occurred",
      status: error.response.status,
      data: error.response.data,
      isNetworkError: false
    };
  } else if (error.request) {
    return {
      message: "Network error. Please check your connection.",
      status: 0,
      data: null,
      isNetworkError: true
    };
  } else {
    return {
      message: error.message || "An unexpected error occurred",
      status: 500,
      data: null,
      isNetworkError: false
    };
  }
};

export const studentRegister = async (userData) => {
  try {
    const response = await api.post("/auth/register", {
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      role: "STUDENT"
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const professorRegister = async (userData) => {
  try {
    const response = await api.post("/auth/register", {
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      role: "PROFESSOR",
      instituteName: userData.instituteName,
      areaOfExpertise: userData.areaOfExpertise
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const login = async (credentials) => {
  try {
    console.log("📤 Sending login request for:", credentials.email);
    const response = await api.post("/auth/login", {
      email: credentials.email,
      password: credentials.password
    });
    console.log("📥 Login raw response:", response.data);
    
    // ✅ Note: accessToken is now in HTTP-only cookie, not in response body!
    // The backend should remove accessToken from the response body
    
    return response.data;
  } catch (error) {
    console.error("❌ Login API error:", error);
    throw handleError(error);
  }
};

export const refreshAccessToken = async (refreshTokenValue) => {
  try {
    const response = await api.post("/auth/refresh", {
      refreshToken: refreshTokenValue
    });
    // ✅ Note: New access token is set in cookie, not in response body
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const logout = async (refreshTokenValue) => {
  try {
    if (refreshTokenValue) {
      await api.post("/auth/logout", { refreshToken: refreshTokenValue });
    }
  } catch (error) {
    console.error("Logout API error:", error);
  }
  // ✅ localStorage clearing is handled by AuthContext, not here
};

export const getProfile = async () => {
  try {
    console.log("📡 Fetching user profile...");
    const response = await api.get("/users/profile");
    console.log("📡 Profile response:", response.data);
    
    // Store user data in localStorage for persistence
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("✅ User data stored in localStorage");
    }
    
    return response.data;
  } catch (error) {
    console.error("❌ Get profile error:", error);
    throw handleError(error);
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.post("/auth/change-password", {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const validateToken = async () => {
  try {
    const response = await api.get("/auth/validate");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export default {
  studentRegister,
  professorRegister,
  login,
  refreshAccessToken,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  validateToken,
  getProfile,
  handleError
};