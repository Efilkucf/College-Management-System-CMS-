import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth'; // Backend URL

// Login function
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    }
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data || 'Login failed');
  }
};

// Register function
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data || 'Registration failed');
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
  console.log('User logged out successfully');
};
