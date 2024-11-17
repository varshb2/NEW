import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "login", { email, password });
  }

  register(email, password) {
    return axios.post(API_URL + "register", { email, password });
  }

  logout() {
    localStorage.removeItem("authToken");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
