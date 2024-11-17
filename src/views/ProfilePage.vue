<template>
  <div class="profile-page">
    <div class="profile-header">
      <h1>Profile Settings</h1>
      <button @click="logout">Logout</button>
    </div>

    <div class="profile-info">
      <h2>Your Information</h2>
      <div v-if="userInfo">
        <p><strong>Name:</strong> {{ userInfo.name }}</p>
        <p><strong>Email:</strong> {{ userInfo.email }}</p>
        <p><strong>Current Language:</strong> {{ currentLanguage }}</p>
      </div>
      <div v-else>
        <p>Loading your profile...</p>
      </div>
    </div>

    <div class="language-preferences">
      <h2>Language Preferences</h2>
      <select v-model="currentLanguage" @change="updateLanguagePreference">
        <option
          v-for="language in availableLanguages"
          :key="language.id"
          :value="language.name"
        >
          {{ language.name }}
        </option>
      </select>
    </div>

    <div class="update-password">
      <h2>Change Password</h2>
      <form @submit.prevent="updatePassword">
        <div class="form-group">
          <label for="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            v-model="currentPassword"
            required
          />
        </div>
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            v-model="newPassword"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>

    <div v-if="passwordError" class="error-message">
      <p>{{ passwordError }}</p>
    </div>
  </div>
</template>

<script>
import jwtHelper from "@/utils/jwtHelper";
import ProfileService from "@/services/ProfileService";

export default {
  data() {
    return {
      userInfo: null,
      currentLanguage: "English", // Default language (could be fetched dynamically)
      availableLanguages: [
        { id: 1, name: "English" },
        { id: 2, name: "Spanish" },
        { id: 3, name: "French" },
        // Add other languages as needed
      ],
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      passwordError: "",
    };
  },
  created() {
    // Fetch the user's profile information and set up default language
    this.userInfo = jwtHelper.getUserInfo();
    this.loadUserLanguagePreference();
  },
  methods: {
    // Logout function to remove JWT and redirect to login
    logout() {
      jwtHelper.removeToken();
      this.$router.push("/login");
    },

    // Load user's language preference (could be fetched from an API if needed)
    loadUserLanguagePreference() {
      // You can replace this with an API call to get the user's preferred language
      this.currentLanguage = this.userInfo
        ? this.userInfo.languagePreference
        : "English";
    },

    // Update the user's language preference (send this to the backend if needed)
    updateLanguagePreference() {
      // Call a method from the ProfileService to update the language preference in the database
      ProfileService.updateLanguagePreference(this.currentLanguage)
        .then(() => {
          this.$toast.success("Language preference updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating language preference:", error);
        });
    },

    // Update the user's password (call backend API)
    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.passwordError = "New passwords do not match!";
        return;
      }

      try {
        await ProfileService.updatePassword(
          this.currentPassword,
          this.newPassword
        );
        this.$toast.success("Password updated successfully!");
        this.resetPasswordFields(); // Clear the form after success
      } catch (error) {
        this.passwordError =
          "There was an error updating the password. Please try again.";
        console.error("Password update error:", error);
      }
    },

    // Reset password fields after successful password update
    resetPasswordFields() {
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.passwordError = "";
    },
  },
};
</script>

<style scoped>
.profile-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.profile-header {
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

.profile-info,
.language-preferences,
.update-password {
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

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  padding: 8px;
  width: 100%;
  font-size: 14px;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
