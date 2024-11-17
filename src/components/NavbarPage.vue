<template>
  <v-app-bar app color="primary" dark>
    <v-container>
      <!-- Logo and App Name -->
      <v-row align="center" no-gutters>
        <v-col cols="auto">
          <v-img src="@/assets/logo.png" max-width="50" alt="Logo"></v-img>
        </v-col>
        <v-col>
          <v-toolbar-title>Language Learner</v-toolbar-title>
        </v-col>
      </v-row>

      <!-- Navbar Items -->
      <v-spacer></v-spacer>
      <v-row align="center" no-gutters>
        <!-- Links - for logged-in users -->
        <v-col v-if="isAuthenticated" cols="auto">
          <v-btn text to="/dashboard">Dashboard</v-btn>
        </v-col>
        <v-col v-if="isAuthenticated" cols="auto">
          <v-btn text to="/profile">Profile</v-btn>
        </v-col>

        <!-- Links - for non-authenticated users -->
        <v-col v-if="!isAuthenticated" cols="auto">
          <v-btn text to="/login">Login</v-btn>
        </v-col>
        <v-col v-if="!isAuthenticated" cols="auto">
          <v-btn text to="/register">Register</v-btn>
        </v-col>

        <!-- Logout Button for Authenticated Users -->
        <v-col v-if="isAuthenticated" cols="auto">
          <v-btn text @click="logout">Logout</v-btn>
        </v-col>
      </v-row>

      <!-- Mobile Hamburger Menu (for smaller screens) -->
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="d-md-none"
      ></v-app-bar-nav-icon>
    </v-container>

    <!-- Side Drawer for Mobile / Tablet -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item v-if="isAuthenticated" @click="navigateTo('dashboard')">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isAuthenticated" @click="navigateTo('profile')">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isAuthenticated" @click="navigateTo('login')">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isAuthenticated" @click="navigateTo('register')">
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isAuthenticated" @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavbarPage",
  data() {
    return {
      // Track if user is logged in
      isAuthenticated: false, // Update based on actual authentication state
      drawer: false, // For mobile drawer
    };
  },
  created() {
    // Check if user is authenticated (e.g., via localStorage or Vuex)
    this.isAuthenticated = this.checkAuthentication();
  },
  methods: {
    // Simulate checking authentication (this should be implemented with actual logic)
    checkAuthentication() {
      // For example, check if there is a JWT token stored
      return !!localStorage.getItem("authToken");
    },
    // Logout function
    logout() {
      // Remove JWT token or any user session data
      localStorage.removeItem("authToken");
      this.isAuthenticated = false;
      this.$router.push("/login");
    },
    // Helper method to navigate
    navigateTo(page) {
      this.$router.push({ name: page });
      this.drawer = false; // Close drawer on selection
    },
  },
};
</script>

<style scoped>
/* Optional: Style adjustments for navbar */
</style>
