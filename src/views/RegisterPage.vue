<template>
  <div class="register-page">
    <div class="register-header">
      <h1>Create an Account</h1>
      <p>
        Welcome to the Language Learning Platform! Please register to get
        started.
      </p>
    </div>

    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          type="text"
          id="name"
          v-model="user.name"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          placeholder="Enter your email"
          required
        />
        <div v-if="emailError" class="error-message">
          <p>{{ emailError }}</p>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          placeholder="Create a password"
          required
        />
        <div v-if="passwordError" class="error-message">
          <p>{{ passwordError }}</p>
        </div>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="user.confirmPassword"
          placeholder="Confirm your password"
          required
        />
        <div v-if="confirmPasswordError" class="error-message">
          <p>{{ confirmPasswordError }}</p>
        </div>
      </div>

      <button type="submit" :disabled="isSubmitting">Register</button>
    </form>

    <div class="login-link">
      <p>
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/authService";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      isSubmitting: false,
    };
  },
  methods: {
    // Validate form inputs
    validateForm() {
      this.emailError = "";
      this.passwordError = "";
      this.confirmPasswordError = "";

      let isValid = true;

      // Email validation
      if (!this.user.email || !this.isValidEmail(this.user.email)) {
        this.emailError = "Please enter a valid email address.";
        isValid = false;
      }

      // Password validation
      if (!this.user.password || this.user.password.length < 8) {
        this.passwordError = "Password must be at least 8 characters long.";
        isValid = false;
      }

      // Confirm password validation
      if (this.user.password !== this.user.confirmPassword) {
        this.confirmPasswordError = "Passwords do not match.";
        isValid = false;
      }

      return isValid;
    },

    // Check if the email is valid
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    // Handle user registration
    async registerUser() {
      if (!this.validateForm()) {
        return; // Don't submit if validation fails
      }

      this.isSubmitting = true;

      try {
        await AuthService.register(this.user);
        this.$toast.success("Registration successful! Please login.");
        this.$router.push("/login");
      } catch (error) {
        console.error("Registration error:", error);
        this.$toast.error(
          "An error occurred during registration. Please try again."
        );
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.register-header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

button:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.login-link {
  margin-top: 20px;
  text-align: center;
}

.login-link p {
  font-size: 14px;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
