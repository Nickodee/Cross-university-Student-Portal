import axios from 'axios';

const BASE_URL = "http://localhost:8000";
const API_URL = '/api/users/';

// Login user
const login = async (userData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(BASE_URL + API_URL + 'login', userData, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}` // Use the Token scheme as specified
      },
      credentials: 'include',
    });
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


const getAuthenticatedUser = async () => {
  try {
    const response = await fetch(BASE_URL + API_URL + 'user', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('User unauthenticated');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    // Handle error, e.g., display a message or try refreshing the token
    console.error('Failed to get authenticated user:', error.message);
    return null;
  }
};


// Logout user
const logout = async () => {
  try{
    const response = await axios.post(BASE_URL + API_URL + 'logout', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials:true
    })
    return response
    
  } catch (error) {
    console.log(error)
  }
};

const authService = {
  register,
  logout,
  login,
  getAuthenticatedUser
};

export default authService;
