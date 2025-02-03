import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL,API_URL } from '../constants/contant';

const initialState = {
  trials:[],
  status: 'idle',
};

//action creator
export const fetchTrialsAsync = createAsyncThunk(
  'trials/fetchtrials',
  async () => {
    const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_TRIALS}`);
    return response.data.response;
  }
);

export const TrialSlice = createSlice({
  name: 'trials',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrialsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrialsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.trials  = action.payload;
      });
  },
});

export default TrialSlice.reducer;
