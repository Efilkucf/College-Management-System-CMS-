import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth'; // Backend authentication endpoint

// Login user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      localStorage.setItem('token', response.data.token); // Save token in localStorage
      return response.data; // Return response data (e.g., user details and token)
    }
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data || 'Login failed');
  }
};

// Register user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data; // Return success message or registered user details
    }
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data || 'Registration failed');
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token'); // Remove token from localStorage
};
