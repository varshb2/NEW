// authRoutes.js

import LoginPage from "@/views/LoginPage.vue";
import ForgotPasswordPage from "@/views/ForgotPasswordPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";

export default [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      requiresAuth: false, // This route does not require authentication
    },
  },
  {
    path: "/RegisterPage",
    name: "RegisterPage",
    component: RegisterPage,
    meta: {
      requiresAuth: false, // This route does not require authentication
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPasswordPage,
    meta: {
      requiresAuth: false, // This route does not require authentication
    },
  },
];
