import { createSlice } from '@reduxjs/toolkit';

const initialState = { pending: false, success: false, error: false };

const StatusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    pending(state) {
      state.pending = true;
      state.success = false;
      state.error = false;
    },
    success(state) {
      state.pending = false;
      state.success = true;
      state.error = false;
    },
    error(state, action) {
      state.pending = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const statusActions = StatusSlice.actions;

export default StatusSlice.reducer;
