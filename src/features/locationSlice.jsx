import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  locations:[],
  status: 'idle',
};

//action creator
export const fetchLocationsAsync = createAsyncThunk(
  'locations/fetchlocations',
  async () => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_LOCATIONS}`);
    return response.data.response;
  }
);

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocationsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.locations  = action.payload;
      });
  },
});

export default locationSlice.reducer;
