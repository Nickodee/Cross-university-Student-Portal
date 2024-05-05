import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postJobService from './postJobService'

const initialState = {
    jobs: [],
    isPostJobLoading: false,
    isPostJobError: false,
    isPostJobSuccess: false,
    postJobMessage: '',
}

export const createNewJobPost = createAsyncThunk('postjob/create', async(postJobData,thunkAPI) => {
    try{
      return await postJobService.createPost(postJobData)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

  export const retrieveAllJobs = createAsyncThunk('jobs/', async(thunkAPI) => {
    try{
      return await postJobService.retrieveJobPosts()
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const postJobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        reset: (state) => initialState,
    } , 
    extraReducers : (builder) => {
        builder 
            .addCase(createNewJobPost.pending, (state) => {
                state.isPostJobLoading = true
              })
            .addCase(createNewJobPost.fulfilled, (state, action) => {
                state.isPostJobLoading = false
                state.isPostJobSuccess = true
                state.jobs = action.payload
              })
            .addCase(createNewJobPost.rejected, (state, action) => {
                state.isPostJobLoading = false
                state.isPostJobError = true
                state.message = action.payload
              })
            .addCase(retrieveAllJobs.pending, (state) => {
                state.isPostJobLoading = true
              })
            .addCase(retrieveAllJobs.fulfilled, (state, action) => {
                state.isPostJobLoading = false
                state.isPostJobSuccess = true
                state.jobs = action.payload
              })
            .addCase(retrieveAllJobs.rejected, (state, action) => {
                state.isPostJobLoading = false
                state.isPostJobError = true
                state.message = action.payload
              })
    }
});

export const {reset} = postJobSlice.actions
export default postJobSlice.reducer;