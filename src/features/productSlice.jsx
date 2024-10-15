import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  products:[],
  status: 'idle',
  update_status:'idle'
};

//action creator
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchproducts',
  async () => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_PRODUCT}`);
    return response.data.response;
  }
);

export const updateProductStock = createAsyncThunk(
  'products/updateproductstock',
  async (data) => {
    const response = await axios.post(`${BASE_URL}${API_URL.UPDATE_PRODUCT_STOCK}`,data);
    return response.data.response;
  }
)

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products  = action.payload;
      })
      .addCase(updateProductStock.pending, (state) => {
        state.update_status = 'loading';
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        state.update_status = 'idle';
        // state.products  = action.payload;
      });
  },
});

export default ProductSlice.reducer;
