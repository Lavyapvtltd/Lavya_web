import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  categories:[],
  status: 'idle',
};

//action creator
export const fetchCategoriesAsync = createAsyncThunk(
  'categories/fetchcategories',
  async () => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_CATEGORIES}`);
    return response.data.response;
  }
);

export const categorySlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories  = action.payload;
      });
  },
});

export default categorySlice.reducer;
