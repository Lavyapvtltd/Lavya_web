import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  firsttimerecharges:[],
  status: 'idle',
};

//action creator
export const fetchFirstTimeRechargeAsync = createAsyncThunk(
  'firsttimerecharges/fetchfirsttimerecharge',
  async () => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_FIRST_TIME_RECHARGE}`);
    return response.data.response;
  }
);

export const firstTimeRechargeSlice = createSlice({
  name: 'firsttimerecharges',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirstTimeRechargeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFirstTimeRechargeAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.firsttimerecharges  = action.payload;
      });
  },
});

export default firstTimeRechargeSlice.reducer;
