import axios from "axios";

// Set default authorization headers for every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");  // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Attach token to Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axios;
