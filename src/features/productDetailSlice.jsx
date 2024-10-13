import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  product:{},
  status: 'idle',
};

//action creator
export const fetchProductDetailAsync = createAsyncThunk(
  'products/fetchproductdetail',
  async (id) => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_PRODUCT_DETAIL}${id}`);
    return response.data.response;
  }
);

export const ProductDetailSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetailAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.product  = action.payload;
      });
  },
});

export default ProductDetailSlice.reducer;
