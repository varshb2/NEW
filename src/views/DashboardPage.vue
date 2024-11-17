<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Welcome, {{ userInfo.name }}!</h1>
      <p>Your current language: {{ currentLanguage }}</p>
      <button @click="logout">Logout</button>
    </div>

    <div class="progress-summary">
      <h2>Your Progress</h2>
      <div v-if="userProgress">
        <p>Proficiency Level: {{ userProgress.proficiencyLevel }}</p>
        <p>
          Completed Lessons: {{ userProgress.completedLessons.length }} /
          {{ totalLessons }}
        </p>
        <p>
          Completed Quizzes: {{ userProgress.completedQuizzes.length }} /
          {{ totalQuizzes }}
        </p>
      </div>
      <div v-else>
        <p>Loading your progress...</p>
      </div>
    </div>

    <div class="language-selector">
      <h2>Select Language</h2>
      <select v-model="currentLanguage" @change="changeLanguage">
        <option
          v-for="language in availableLanguages"
          :key="language.id"
          :value="language.name"
        >
          {{ language.name }}
        </option>
      </select>
    </div>

    <div class="learning-resources">
      <h2>Available Lessons</h2>
      <div v-if="availableLessons.length > 0">
        <ul>
          <li v-for="lesson in availableLessons" :key="lesson.id">
            <a :href="`/lessons/${lesson.id}`">{{ lesson.title }}</a>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No lessons available for this language yet.</p>
      </div>
    </div>

    <div class="language-challenges">
      <h2>Challenges & Games</h2>
      <div v-if="languageChallenges.length > 0">
        <ul>
          <li v-for="challenge in languageChallenges" :key="challenge.id">
            <a :href="`/challenges/${challenge.id}`">{{ challenge.title }}</a>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No challenges available for this language yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressService from "@/services/ProgressService";
import jwtHelper from "@/utils/jwtHelper";

export default {
  data() {
    return {
      userProgress: null,
      userInfo: null,
      currentLanguage: "English", // Default language (could be fetched dynamically)
      availableLanguages: [
        { id: 1, name: "English" },
        { id: 2, name: "Spanish" },
        { id: 3, name: "French" },
        // Add other languages as needed
      ],
      availableLessons: [],
      languageChallenges: [],
      totalLessons: 10, // Replace with dynamic total lessons
      totalQuizzes: 5, // Replace with dynamic quiz count
    };
  },
  async created() {
    // Fetch user info and progress when the dashboard is created
    this.userInfo = jwtHelper.getUserInfo();
    this.loadProgress();
    this.loadLanguageContent();
  },
  methods: {
    // Logout function to remove JWT and redirect to login
    logout() {
      jwtHelper.removeToken();
      this.$router.push("/login");
    },

    // Load user progress (lessons, quizzes, proficiency level)
    async loadProgress() {
      try {
        const data = await ProgressService.getUserProgress(
          this.currentLanguage
        );
        this.userProgress = data;
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    },

    // Load lessons and challenges for the current language
    async loadLanguageContent() {
      try {
        // Fetch lessons and challenges based on the current language
        const lessons = await ProgressService.getAvailableLessons(
          this.currentLanguage
        );
        this.availableLessons = lessons;

        const challenges = await ProgressService.getLanguageChallenges(
          this.currentLanguage
        );
        this.languageChallenges = challenges;
      } catch (error) {
        console.error("Error fetching lessons or challenges:", error);
      }
    },

    // Change the selected language and reload progress and content
    async changeLanguage() {
      this.loadProgress();
      this.loadLanguageContent();
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  color: #333;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}

.progress-summary,
.language-selector,
.learning-resources,
.language-challenges {
  margin-bottom: 40px;
}

h2 {
  color: #555;
}

select {
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  width: 200px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}
</style>
