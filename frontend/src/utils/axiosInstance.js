import axios from "axios";
import { toast } from 'sonner'; 

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach token from localStorage
apiInstance.interceptors.request.use((config) => {
  const stored = JSON.parse(localStorage.getItem("user"));
  if (stored?.token) {
    config.headers.Authorization = `Bearer ${stored.token}`;
  }
  return config;
});

// Handle expired/invalid token
apiInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("⛔ Token expired or unauthorized");
      toast.error("Session expired");

      // Clear local storage
      localStorage.removeItem("user");

      // Optional toast (user-friendly)

      // Force redirect to login (reliable even outside Router)
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default apiInstance;
