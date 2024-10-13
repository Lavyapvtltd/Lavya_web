import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  recharges:[],
  status: 'idle',
};

//action creator
export const fetchRechagresAsync = createAsyncThunk(
  'recharges/fetchrecharges',
  async () => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_RECHARGES}`);
    return response.data.response;
  }
);

export const RechargeSlice = createSlice({
  name: 'recharges',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRechagresAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRechagresAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.recharges  = action.payload;
      });
  },
});

export default RechargeSlice.reducer;
