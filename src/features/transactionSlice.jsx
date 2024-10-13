import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  transactions:[],
  status: 'idle',
};

//action creator
export const fetchTransactionsAsync = createAsyncThunk(
  'transactions/fetchtransactions',
  async (user_id) => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_TRANSACTIONS}${user_id}`);
    return response.data.response;
  }
);

export const TransactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.transactions  = action.payload;
      });
  },
});

export default TransactionSlice.reducer;
