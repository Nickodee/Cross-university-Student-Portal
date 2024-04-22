import axios from "axios";

const BASE_URL = "http://localhost:8000/";

const createQuestion = async (questionData) => {
    try {
        const userFromStorage = localStorage.getItem('user');
        const user = JSON.parse(userFromStorage);
        const token = user.token;
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        const response = await axios.post(BASE_URL + 'question/create/', questionData, { headers });
        return response.data;
    } catch (error) {
        console.error('Failed to create question:', error.message);
        throw error;
    }
};

const retrieveQuestions = async () => {
    try {
        const response = await axios.get(BASE_URL + 'questions/');
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve questions:', error.message);
        throw error;
    }
};

const createResponse = async (responseData) => {
    try {
        const userFromStorage = localStorage.getItem('user');
        const user = JSON.parse(userFromStorage);
        const token = user.token;
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        };
        const response = await axios.post(BASE_URL + 'response/create/', responseData, { headers });
        return response.data;
    } catch (error) {
        console.error('Failed to create response:', error.message);
        throw error;
    }
};

const retrieveResponses = async () => {
    try {
        const response = await axios.get(BASE_URL + 'responses/');
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve responses:', error.message);
        throw error;
    }
};

const questionService = {
    createQuestion,
    retrieveQuestions,
    createResponse,
    retrieveResponses,
};

export default questionService;
