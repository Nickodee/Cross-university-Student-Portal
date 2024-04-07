import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from './chatService';

const initialState = {
  messages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData, thunkAPI) => {
    try {
      return await chatService.sendMessage(messageData);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMessage = createAsyncThunk(
  'chat/getMessage',
  async (messageId, thunkAPI) => {
    try {
      return await chatService.getMessage(messageId);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllMessages = createAsyncThunk(
  'chat/getAllMessages',
  async (_, thunkAPI) => {
    try {
      return await chatService.getAllMessages();
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateMessage = createAsyncThunk(
  'chat/updateMessage',
  async ({ messageId, messageData }, thunkAPI) => {
    try {
      return await chatService.updateMessage(messageId, messageData);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (messageId, thunkAPI) => {
    try {
      return await chatService.deleteMessage(messageId);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserMessages = createAsyncThunk(
  'chat/getUserMessages',
  async (_, thunkAPI) => {
    try {
      return await chatService.getUserMessages();
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.messages.push(action.payload);
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.isSuccess = true;
        const index = state.messages.findIndex((message) => message.id === action.payload.id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.messages = state.messages.filter((message) => message.id !== action.payload);
      })
      .addCase(getUserMessages.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export default chatSlice.reducer;
