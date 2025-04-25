import axios from 'axios';
import { toast } from 'react-hot-toast'; 

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL_NEW || 'https://blog-post-ubkk.onrender.com/api',
  withCredentials: true,
  timeout: 10000,
});

// Add request logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    toast.error('Request error occurred. Please try again.');
    return Promise.reject(error);
  }
);

// Handle errors but don't block requests pre-emptively
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Received API response from: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.warn('⚠️ Request canceled:', error.message);
    } else if (!error.response) {
      console.error('Failed to load. Check internet connection and refresh page', error.message);
      toast.error('Network error. Please check your connection.');
    } else {
      console.error(`❌ API response error from ${error.config?.url || 'unknown'}:`, error.response.status);
      toast.error(`Error ${error.response.status}: ${error.response.statusText}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
