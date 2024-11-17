// services/ProgressService.js

import axios from "axios";

const API_URL = "https://your-api-url.com"; // Replace with your API's base URL

// Helper function to handle API requests
const apiRequest = async (url, method = "GET", data = null) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include the auth token
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error; // Rethrow error to be handled in components
  }
};

// ProgressService class to interact with user progress data
class ProgressService {
  // Fetch the progress for a specific language
  static async getUserProgress(languageId) {
    return apiRequest(`/progress/${languageId}`);
  }

  // Submit the user's progress (e.g., after completing a lesson or quiz)
  static async submitLessonProgress(languageId, lessonId, progressData) {
    return apiRequest(
      `/progress/${languageId}/lessons/${lessonId}`,
      "POST",
      progressData
    );
  }

  // Fetch the user's current proficiency level for a specific language
  static async getProficiencyLevel(languageId) {
    return apiRequest(`/progress/${languageId}/proficiency-level`);
  }

  // Submit the user's quiz results
  static async submitQuizResults(languageId, quizId, resultsData) {
    return apiRequest(
      `/progress/${languageId}/quizzes/${quizId}`,
      "POST",
      resultsData
    );
  }

  // Fetch all assessments (e.g., quizzes or tests) for a given language
  static async getAssessments(languageId) {
    return apiRequest(`/progress/${languageId}/assessments`);
  }

  // Fetch the user's overall progress (including completed lessons, quizzes, and proficiency)
  static async getOverallProgress() {
    return apiRequest("/progress/overall");
  }

  // Update user progress for a particular task or lesson
  static async updateProgress(languageId, lessonId, progressData) {
    return apiRequest(
      `/progress/${languageId}/lessons/${lessonId}/update`,
      "PATCH",
      progressData
    );
  }
}

export default ProgressService;
