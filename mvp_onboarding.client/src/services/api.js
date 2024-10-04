import axios from 'axios';

const api = axios.create({
  //baseURL: 'https://localhost:5173/api', 
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://talentonboarding-fhaeg9hvafb6gwfs.australiaeast-01.azurewebsites.net/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
