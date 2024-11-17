// db.js - This module handles database-like operations using localStorage
const DB_KEY = "languageLearnerData"; // Key for local storage

// Helper function to load data from localStorage
function loadData() {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : {}; // Return an empty object if no data exists
}

// Helper function to save data to localStorage
function saveData(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

// Function to get user profile data
export function getUserProfile(userId) {
  const data = loadData();
  return data.users ? data.users[userId] : null; // Return user data if available
}

// Function to create or update user profile
export function saveUserProfile(userId, profileData) {
  const data = loadData();
  if (!data.users) {
    data.users = {}; // Initialize if no users exist
  }
  data.users[userId] = profileData; // Save or update the user profile
  saveData(data);
}

// Function to get user progress data (language skills, etc.)
export function getUserProgress(userId) {
  const data = loadData();
  return data.progress && data.progress[userId] ? data.progress[userId] : null;
}

// Function to save user progress (e.g., vocabulary, grammar progress, etc.)
export function saveUserProgress(userId, progressData) {
  const data = loadData();
  if (!data.progress) {
    data.progress = {}; // Initialize if no progress data exists
  }
  data.progress[userId] = progressData; // Save or update the user's progress
  saveData(data);
}

// Function to get all available languages
export function getLanguages() {
  return ["English", "Spanish", "French", "German", "Chinese"]; // Example static list
}

// Function to get available learning materials for a language
export function getLearningMaterials(language) {
  const materials = {
    English: ["Vocabulary List", "Grammar Exercises", "Speaking Practice"],
    Spanish: [
      "Lista de Vocabulario",
      "Ejercicios de Gramática",
      "Práctica Oral",
    ],
    French: [
      "Liste de Vocabulaire",
      "Exercices de Grammaire",
      "Pratique Orale",
    ],
    German: ["Wortschatzliste", "Grammatikübungen", "Sprechübungen"],
    Chinese: ["词汇表", "语法练习", "口语练习"],
  };

  return materials[language] || [];
}

// Function to simulate checking user authentication (for example, based on a token)
export function checkAuthToken() {
  const authToken = localStorage.getItem("authToken");
  return authToken ? true : false; // Return true if the token exists
}

// Function to simulate user login (store a fake auth token)
export function login(userId) {
  const fakeAuthToken = `token_${userId}`; // Simulating an auth token
  localStorage.setItem("authToken", fakeAuthToken); // Store it in localStorage
  return fakeAuthToken;
}

// Function to simulate user logout
export function logout() {
  localStorage.removeItem("authToken"); // Remove the auth token from localStorage
}
