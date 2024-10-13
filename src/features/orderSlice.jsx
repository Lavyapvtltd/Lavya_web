import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, API_URL } from '../constants/contant';

const initialState = {
  orders: [],
  status: 'idle',
  subscription_orders: [],
  subscription_status: "idel"
};

//action creator
export const fetchOrdersAsync = createAsyncThunk(
  'orders/fetchorders',
  async (user_id) => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_ORDERS}${user_id}`);
    return response.data.response;
  }
);
export const fetchSubsciptionOrdersAsync = createAsyncThunk(
  'orders/fetchsubsciptionorders',
  async (user_id) => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_SUBSCIPTION_ORDERS}${user_id}`);
    return response.data.response;
  }
);

export const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(fetchSubsciptionOrdersAsync.pending, (state) => {
        state.subscription_status = 'loading';
      })
      .addCase(fetchSubsciptionOrdersAsync.fulfilled, (state, action) => {
        state.subscription_status = 'idle';
        state.subscription_orders = action.payload;
      });
  },
});

export default OrderSlice.reducer;
