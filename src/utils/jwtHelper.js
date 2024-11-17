// utils/jwtHelper.js

// Import the JWT decoding library
import jwt_decode from "jwt-decode";

// Helper function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem("authToken"); // Assuming JWT is stored as 'authToken' in localStorage
};

// Helper function to save the token in localStorage
const saveToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Helper function to remove the token from localStorage
const removeToken = () => {
  localStorage.removeItem("authToken");
};

// Decode the JWT token and extract the payload
const decodeToken = (token) => {
  try {
    return jwt_decode(token); // Decode the JWT and return the payload
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Check if the JWT has expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true; // Token has expired
    }
    return false; // Token is still valid
  } catch (error) {
    return true; // If the token is invalid, consider it expired
  }
};

// Get user information from the token (e.g., user ID)
const getUserInfo = () => {
  const token = getToken();
  if (token) {
    const decoded = decodeToken(token);
    return decoded ? decoded : null; // Return decoded token data (user info)
  }
  return null; // Return null if no token exists
};

// Check if the user is authenticated
const isAuthenticated = () => {
  const token = getToken();
  if (token && !isTokenExpired(token)) {
    return true; // User is authenticated
  }
  return false; // Token does not exist or has expired
};

export default {
  getToken,
  saveToken,
  removeToken,
  decodeToken,
  isTokenExpired,
  getUserInfo,
  isAuthenticated,
};
