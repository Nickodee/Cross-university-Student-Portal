import axios from "axios";
const BASE_URL = "http://localhost:8000/";

const createJobPost = async (postJobData) => {
    try {
        const resp =  await axios.post(BASE_URL + 'postjob/create/', postJobData)
        return resp.data
    } catch (error) {
        console.error('Failed to post:', error.message);
        throw error;
    }
}

const retrieveJobPosts = async () => {
    try{
        const response =  await axios.get(BASE_URL + 'jobs/')
        return response.data
    }
    catch (error) {
        console.error('Failed to retrieve jobs:', error.message);
        throw error;
    }
}

const postJobService = {
    createJobPost,
    retrieveJobPosts,
}

export default postJobService;