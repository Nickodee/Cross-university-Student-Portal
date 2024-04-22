import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import questionService from './questionService';

const initialState = {
    questions: [],
    responses: [],
    isQuestionLoading: false,
    isQuestionError: false,
    isQuestionSuccess: false,
    questionMessage: '',
    isResponseLoading: false,
    isResponseError: false,
    isResponseSuccess: false,
    responseMessage: '',
};

export const createNewQuestion = createAsyncThunk('question/create', async (questionData, thunkAPI) => {
    try {
        return await questionService.createQuestion(questionData);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const retrieveAllQuestions = createAsyncThunk('questions/', async (thunkAPI) => {
    try {
        return await questionService.retrieveQuestions();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const createNewResponse = createAsyncThunk('response/create', async (responseData, thunkAPI) => {
    try {
        return await questionService.createResponse(responseData);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const retrieveAllResponses = createAsyncThunk('responses/', async (thunkAPI) => {
    try {
        return await questionService.retrieveResponses();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewQuestion.pending, (state) => {
                state.isQuestionLoading = true;
            })
            .addCase(createNewQuestion.fulfilled, (state, action) => {
                state.isQuestionLoading = false;
                state.isQuestionSuccess = true;
                state.questions = action.payload;
            })
            .addCase(createNewQuestion.rejected, (state, action) => {
                state.isQuestionLoading = false;
                state.isQuestionError = true;
                state.message = action.payload;
            })
            .addCase(retrieveAllQuestions.pending, (state) => {
                state.isQuestionLoading = true;
            })
            .addCase(retrieveAllQuestions.fulfilled, (state, action) => {
                state.isQuestionLoading = false;
                state.isQuestionSuccess = true;
                state.questions = action.payload;
            })
            .addCase(retrieveAllQuestions.rejected, (state, action) => {
                state.isQuestionLoading = false;
                state.isQuestionError = true;
                state.message = action.payload;
            })
            .addCase(createNewResponse.pending, (state) => {
                state.isResponseLoading = true;
            })
            .addCase(createNewResponse.fulfilled, (state, action) => {
                state.isResponseLoading = false;
                state.isResponseSuccess = true;
                state.responses = action.payload;
            })
            .addCase(createNewResponse.rejected, (state, action) => {
                state.isResponseLoading = false;
                state.isResponseError = true;
                state.message = action.payload;
            })
            .addCase(retrieveAllResponses.pending, (state) => {
                state.isResponseLoading = true;
            })
            .addCase(retrieveAllResponses.fulfilled, (state, action) => {
                state.isResponseLoading = false;
                state.isResponseSuccess = true;
                state.responses = action.payload;
            })
            .addCase(retrieveAllResponses.rejected, (state, action) => {
                state.isResponseLoading = false;
                state.isResponseError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = questionSlice.actions;
export default questionSlice.reducer;
