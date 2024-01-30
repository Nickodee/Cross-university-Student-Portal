import axios from 'axios';

const BASE_URL = "http://localhost:8000";
const API_URL = '/api/users/';

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(BASE_URL + API_URL + 'login', userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    // Handle login error, e.g., display an error message
    console.error('Login failed:', error.message);
    throw error;
  }
};

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(BASE_URL + API_URL + 'register', userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    // Handle registration error, e.g., display an error message
    console.error('Registration failed:', error.message);
    throw error;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
