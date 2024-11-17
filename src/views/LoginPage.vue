<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="loginUser">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
              <v-alert v-if="errorMessage" type="error">{{
                errorMessage
              }}</v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from "@/services/authService";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await AuthService.login(this.email, this.password);
        localStorage.setItem("authToken", response.data.token);
        this.$router.push("/dashboard");
      } catch (error) {
        this.errorMessage = error.response.data.message;
      }
    },
  },
};
</script>
