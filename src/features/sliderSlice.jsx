import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  sliders:[],
  status: 'idle',
};

//action creator
export const fetchSlidersAsync = createAsyncThunk(
  'silders/fetchsliders',
  async () => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_SLIDERS}`);
    return response.data.response;
  }
);

export const sliderSlice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlidersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSlidersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.sliders  = action.payload;
      });
  },
});

export default sliderSlice.reducer;
