import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  testimonials:[],
  status: 'idle',
};

//action creator
export const fetchTestimonialsAsync = createAsyncThunk(
  'testimonials/fetchtestimonials',
  async () => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_TESTIMONIALS}`);
    return response.data.response;
  }
);

export const TestimonialSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonialsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTestimonialsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.testimonials  = action.payload;
      });
  },
});

export default TestimonialSlice.reducer;
