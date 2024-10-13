import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  monthlybill:[],
  status: 'idle',
};

//action creator
export const fetchMonthlybillAsync = createAsyncThunk(
  'monthlybill/fetchmonthlybill',
  async ({user_id,month}) => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_MONTHLY_BILL}${user_id}?month=${month}`);
    return response.data.response;
  }
);

export const MonthlyBillSlice = createSlice({
  name: 'monthlybill',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlybillAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMonthlybillAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.monthlybill  = action.payload;
      });
  },
});

export default MonthlyBillSlice.reducer;
