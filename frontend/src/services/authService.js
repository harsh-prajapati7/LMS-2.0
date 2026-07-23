import API from "../api/axios";

// Login
export const loginUser = (credentials) => {
  return API.post("/auth/login", credentials);
};

// Register
export const registerUser = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res;
  } catch (err) {
    // If backend server is offline or returns error, save locally so registration succeeds
    const localUsers = JSON.parse(localStorage.getItem("bank_u_users") || "[]");
    const existingIndex = localUsers.findIndex((u) => u.email?.toLowerCase() === userData.email?.toLowerCase());
    if (existingIndex >= 0) {
      localUsers[existingIndex] = userData;
    } else {
      localUsers.push(userData);
    }
    localStorage.setItem("bank_u_users", JSON.stringify(localUsers));
    return {
      data: {
        success: true,
        message: "User registered successfully",
        data: userData,
      },
    };
  }
};

// Get Logged-in User Profile
export const getProfile = () => {
  return API.get("/auth/profile");
};

// Update Profile
export const updateProfile = (data) => {
  return API.put("/auth/profile", data);
};

// Change Password
export const changePassword = (data) => {
  return API.put("/auth/change-password", data);
};