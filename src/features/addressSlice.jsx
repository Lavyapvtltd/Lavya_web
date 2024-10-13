import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  addresses:[],
  status: 'idle',
};

//action creator
export const fetchAddressesAsync = createAsyncThunk(
  'addresses/fetchaddresses',
  async (user_id) => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_ADDRESSESS}${user_id}`);
    return response.data.response;
  }
);

export const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddressesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.addresses  = action.payload;
      });
  },
});

export default addressSlice.reducer;
