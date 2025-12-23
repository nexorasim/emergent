import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config._retryCount = config._retryCount || 0;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    if (
      config._retryCount < MAX_RETRIES &&
      (error.response?.status >= 500 || error.code === 'ECONNABORTED')
    ) {
      config._retryCount += 1;
      const delay = RETRY_DELAY * Math.pow(2, config._retryCount - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
      return api(config);
    }
    
    return Promise.reject(error);
  }
);

export default api;