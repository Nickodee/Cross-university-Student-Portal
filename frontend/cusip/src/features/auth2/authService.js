import axios from 'axios'

const BASE_URL = "http://localhost:8000";

const API_URL = '/user/'

// Register user
const register = async (userData) => {
    const response = await axios.post(BASE_URL + API_URL + 'create', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
    try {
        const response = await axios.post(BASE_URL + API_URL + 'login', userData,)
        if (response.data.success) {
            localStorage.setItem('user', JSON.stringify(response.data))
        } else {
            const errorMessage = response.data.message || 'Invalid email or password';
            console.error('Login failed:', errorMessage);
            throw new Error(errorMessage);
        }
        return response.data
    } catch (error) {
        // Handle login error, e.g., display an error message
        console.error('Login failed:', error.message);
        throw error;
    }
}

//get user
const getAuthUser = async ()=>{
    const userFromStorage = localStorage.getItem('user');
    const user = JSON.parse(userFromStorage)
    const user_id = user.user_id
    try{
        const response = await axios.get(BASE_URL + '/user/' + user_id,)
        console.log("user data", response.data)
        return response.data
    }
    catch (error) {
        // Handle login error, e.g., display an error message
        console.error('Login failed:', error.message);
        throw error;
      }
}

//get all users
const getAllUsers = async()=>{
    try{
        const resp = await axios.get(BASE_URL + '/users/')
        return resp.data
    }
    catch (error) {
        // Handle login error, e.g., display an error message
        console.error('Login failed:', error.message);
        throw error;
      }
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
    getAuthUser,
    getAllUsers,
}

export default authService