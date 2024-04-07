import axios from 'axios';

const BASE_URL = "http://localhost:8000";
const API_URL = '/message/';

const chatService = {
    sendMessage,
    getMessage,
    getAllMessages,
    updateMessage,
    deleteMessage,
    getUserMessages,
};

async function sendMessage(messageData) {
    try {
        // Log request data for debugging
        console.log('Sending message:', messageData);

        const userFromStorage = localStorage.getItem('user');
        const user = JSON.parse(userFromStorage)
        const token = user.token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
        const response = await axios.post(`${BASE_URL}${API_URL}send/`, messageData, {headers});
        return response.data;
    } catch (error) {
        console.error('Failed to send message:', error.message);
        console.error('Failed to send message. Request data:', messageData, 'Error:', error);
        throw error;
    }
}

async function getMessage(messageId) {
    try {
        const response = await axios.get(`${BASE_URL}${API_URL}${messageId}/`);
        return response.data;
    } catch (error) {
        console.error('Failed to get message:', error.message);
        throw error;
    }
}

async function getAllMessages() {
    try {
        const response = await axios.get(`${BASE_URL}${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get all messages:', error.message);
        throw error;
    }
}

async function updateMessage(messageId, messageData) {
    try {
        const response = await axios.put(`${BASE_URL}${API_URL}update/${messageId}/`, messageData);
        return response.data;
    } catch (error) {
        console.error('Failed to update message:', error.message);
        throw error;
    }
}

async function deleteMessage(messageId) {
    try {
        await axios.delete(`${BASE_URL}${API_URL}delete/${messageId}/`);
        return messageId;
    } catch (error) {
        console.error('Failed to delete message:', error.message);
        throw error;
    }
}

async function getUserMessages() {
    try {
        const userFromStorage = localStorage.getItem('user');
        const user = JSON.parse(userFromStorage)
        const token = user.token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
        const response = await axios.get(`${BASE_URL}/user/messages/`, {headers});
        return response.data;
    } catch (error) {
        console.error('Failed to get user messages:', error.message);
        throw error;
    }
}

export default chatService;
