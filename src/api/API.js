import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your backend URL
});

// Add Authorization header if a token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
