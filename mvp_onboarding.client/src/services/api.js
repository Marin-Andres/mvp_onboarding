import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:5173/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
