import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  contents:[],
  status: 'idle',
};

//action creator
export const fetchContentsAsync = createAsyncThunk(
  'contents/fetchcontents',
  async () => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_CONTENT}`);
    return response.data.response;
  }
);

export const ContentSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContentsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.contents  = action.payload;
      });
  },
});

export default ContentSlice.reducer;
