import Vue from "vue";
import Router from "vue-router";
import authRoutes from "@/routes/authRoutes"; // Import the authentication routes
import HomeView from "@/views/HomeView.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import authMiddleware from "@/middleware/authMiddleware"; // Import auth middleware

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: false,
    },
  },

  // Include authentication-related routes from authRoutes.js
  ...authRoutes,

  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
    beforeEnter: authMiddleware, // Protect dashboard with authMiddleware
    meta: {
      requiresAuth: true, // This route requires authentication
    },
  },

  // Additional routes can go here...
];

const router = new Router({
  routes,
});

// Global navigation guard for authentication checks
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Check if auth token exists

  // If the route requires auth and the user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({
      path: "/LoginPage", // Redirect to login
      query: { redirect: to.fullPath }, // Pass the target route to redirect after login
    });
  } else {
    next(); // Allow navigation
  }
});

export default router;
