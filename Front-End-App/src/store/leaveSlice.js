import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    leaves: [],
    error: '',
    noData: false,
};

const fetchLeaves = createAsyncThunk('leave/fetchMyLeaves', async () => {
    const response = await axios.get(`/api/leaveApplications`, { withCredentials: true });
    return response.data;
});

const leaveSlice = createSlice({
    name: 'leaves',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(fetchLeaves.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchLeaves.fulfilled, (state, action) => {
            state.loading = false;
            state.leaves = action.payload;
            if(Array.isArray(action.payload) && !action.payload.length){
                state.noData = true;
            }else{
                state.noData = false;
            }
        });
        builder.addCase(fetchLeaves.rejected, (state, action) => {
            state.loading = false;
            state.leaves = [];
            state.error = action.error.message;
        });
    },
});

export default leaveSlice.reducer;
export { fetchLeaves };