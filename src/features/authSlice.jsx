// features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { BASE_URL, API_URL } from '../constants/contant';
export const fetchUserAsync = createAsyncThunk(
  'auth/fetchuser',
  async (user_id) => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_USER_DATA}${user_id}`);
    return response.data.details;
  }
);
export const walletAmountDeduction = createAsyncThunk(
  'auth/walletamountdecuction',
  async ({user_id,data}) => {
    const response = await axios.put(`${BASE_URL}${API_URL.WALLET_AMOUNT_DEDUCTION}${user_id}`,data);
    return response.data.response;
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: "idle",
    user_id: localStorage.getItem('user_id') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoggedIn: !!localStorage.getItem('user_id')
  },
  reducers: {
    setUserId: (state, action) => {
      state.user_id = action.payload;
      localStorage.setItem('user_id', action.payload);
      state.isLoggedIn = !!action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user_id = '';
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user_id');
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      localStorage.removeItem('subscription_cart');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.name) {
          const objectModify = { ...action.payload, verfiyStatus: true };
          state.user = objectModify
          localStorage.setItem('user', JSON.stringify(objectModify));
        } else {
          const objectModify = { ...action.payload, verfiyStatus: false };
          state.user = objectModify
          localStorage.setItem('user', JSON.stringify(objectModify));
        }
      })
      .addCase(walletAmountDeduction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(walletAmountDeduction.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.name) {
          const objectModify = { ...action.payload, verfiyStatus: true };
          state.user = objectModify
          localStorage.setItem('user', JSON.stringify(objectModify));
        } else {
          const objectModify = { ...action.payload, verfiyStatus: false };
          state.user = objectModify
          localStorage.setItem('user', JSON.stringify(objectModify));
        }
      })
  },
});

export const { setUserId, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
