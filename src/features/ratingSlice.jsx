import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  ratings:[],
  status: 'idle',
};

//action creator
export const fetchRatingAsync = createAsyncThunk(
  'ratings/fetchratings',
  async (id) => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_RATING}${id}`);
    return response.data.response;
  }
);

export const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatingAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRatingAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.ratings  = action.payload;
      })
      .addCase(fetchRatingAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.ratings  = [];
      });
  },
});

export default ratingSlice.reducer;
