import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, API_URL } from '../constants/contant';

const initialState = {
    vacations: [],
    status: 'idle',
};

//action creator
export const fetchVacationsAsync = createAsyncThunk(
    'vacations/fetchvacations',
    async (user_id) => {
        const response = await axios.get(`${BASE_URL}${API_URL.GET_ALL_VACATIONS}${user_id}`);
        return response.data.response;
    }
);

export const VacationSlice = createSlice({
    name: 'vacations',
    initialState,
    reducers: {
        setVacations: (state, action) => {
            state.vacations.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacationsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVacationsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.vacations = action.payload;
            })
    },
});

export const { setVacations } = VacationSlice.actions;

export default VacationSlice.reducer;
