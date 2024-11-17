// materialRoutes.js

// services/LanguageService.js

import axios from "axios";

const API_URL = "https://your-api-url.com"; // Replace with your API's base URL

// Helper function to make requests to the backend
const apiRequest = async (url, method = "GET", data = null) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the auth token if needed
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error; // Rethrow the error to be caught in the component
  }
};

// LanguageService class to interact with language-related APIs
class LanguageService {
  // Fetch available languages
  static async getLanguages() {
    return apiRequest("/languages"); // Example endpoint, replace with your backend API
  }

  // Fetch lessons for a specific language
  static async getLessons(languageId) {
    return apiRequest(`/languages/${languageId}/lessons`);
  }

  // Fetch vocabulary for a specific language
  static async getVocabulary(languageId) {
    return apiRequest(`/languages/${languageId}/vocabulary`);
  }

  // Fetch grammar lessons for a specific language
  static async getGrammar(languageId) {
    return apiRequest(`/languages/${languageId}/grammar`);
  }

  // Fetch interactive exercises for a specific language
  static async getInteractiveLessons(languageId) {
    return apiRequest(`/languages/${languageId}/interactive`);
  }

  // Fetch user progress for a specific language
  static async getUserProgress(languageId) {
    return apiRequest(`/languages/${languageId}/progress`);
  }

  // Submit progress or answers for a particular lesson or activity
  static async submitProgress(languageId, lessonId, progressData) {
    return apiRequest(
      `/languages/${languageId}/lessons/${lessonId}/progress`,
      "POST",
      progressData
    );
  }

  // Fetch assessments for a specific language (e.g., quizzes or tests)
  static async getLanguageAssessments(languageId) {
    return apiRequest(`/languages/${languageId}/assessments`);
  }

  // Fetch the user's proficiency level for a language
  static async getProficiencyLevel(languageId) {
    return apiRequest(`/languages/${languageId}/proficiency-level`);
  }
}

export default LanguageService;
