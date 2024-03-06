import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
    posts: [],
    isPostLoading: false,
    isPostError: false,
    isPostSuccess: false,
    postMessage: '',
}

export const createNewPost = createAsyncThunk('post/create', async(postData,thunkAPI) => {
    try{
      return await postService.createPost(postData)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

  export const retrieveAllPosts = createAsyncThunk('allposts/', async(thunkAPI) => {
    try{
      return await postService.retrievePosts()
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reset: (state) => initialState,
    } , 
    extraReducers : (builder) => {
        builder 
            .addCase(createNewPost.pending, (state) => {
                state.isPostLoading = true
              })
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.isPostLoading = false
                state.isPostSuccess = true
                state.posts = action.payload
              })
            .addCase(createNewPost.rejected, (state, action) => {
                state.isPostLoading = false
                state.isPostError = true
                state.message = action.payload
              })
            .addCase(retrieveAllPosts.pending, (state) => {
                state.isPostLoading = true
              })
            .addCase(retrieveAllPosts.fulfilled, (state, action) => {
                state.isPostLoading = false
                state.isPostSuccess = true
                state.posts = action.payload
              })
            .addCase(retrieveAllPosts.rejected, (state, action) => {
                state.isPostLoading = false
                state.isPostError = true
                state.message = action.payload
              })
    }
});

export const {reset} = postSlice.actions
export default postSlice.reducer;