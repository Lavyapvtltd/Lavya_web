import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  banners:[],
  status: 'idle',
};

//action creator
export const fetchBannersAsync = createAsyncThunk(
  'banners/fetchbanners',
  async () => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_BANNERS}`);
    return response.data.response;
  }
);

export const BannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBannersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.banners  = action.payload;
      });
  },
});

export default BannerSlice.reducer;
