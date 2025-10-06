import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds for cold start
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle timeout errors (backend cold start)
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      const friendlyError = new Error('Server is waking up. Please wait 30 seconds and try again.');
      friendlyError.name = 'ServerStarting';
      return Promise.reject(friendlyError);
    }

    // Handle network errors (backend offline)
    if (error.code === 'ERR_NETWORK' || !error.response) {
      const friendlyError = new Error('Cannot connect to server. Please check your internet connection or try again later.');
      friendlyError.name = 'NetworkError';
      return Promise.reject(friendlyError);
    }

    if (error.response?.status === 401) {
      // Clear auth on 401
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
