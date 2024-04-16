import axios from "axios";
const BASE_URL = "http://localhost:8000/";

const createPost = async (postData) => {
    try {
        const userFromStorage = localStorage.getItem('user');
        const user = JSON.parse(userFromStorage)
        const token = user.token
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
        console.log(headers)
        const resp =  await axios.post(BASE_URL + 'post/create/', postData, { headers })
        return resp.data
    } catch (error) {
        console.error('Failed to post:', error.message);
        throw error;
    }
}

const retrievePosts = async () => {
    try{
        const response =  await axios.get(BASE_URL + 'allposts/')
        return response.data
    }
    catch (error) {
        console.error('Failed to retrieve posts:', error.message);
        throw error;
    }
}

const postService = {
    createPost,
    retrievePosts,
}

export default postService;