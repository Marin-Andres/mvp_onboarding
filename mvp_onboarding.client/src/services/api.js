import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:5173/api', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
