<template>
  <div>
    <h1>Forgot Password</h1>
    <form @submit.prevent="resetPasswordRequest">
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    resetPasswordRequest() {
      // Simulate sending a password reset link to the email
      alert(`Password reset link has been sent to ${this.email}`);
      // You would normally make an API call here to trigger the password reset email
    },
  },
};
</script>
