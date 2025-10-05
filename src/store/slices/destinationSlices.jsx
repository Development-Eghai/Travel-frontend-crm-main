// src/slices/destinationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIBaseUrl } from '../../common/api/api';

// Async thunk for GET API
export const getSpecificDestination = createAsyncThunk(
  'destination/getSpecific',
  async (_id, { rejectWithValue }) => {
    try {
      const res = await APIBaseUrl.get(`destinations`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

const destinationSlice = createSlice({
  name: 'destination',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDestination: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpecificDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecificDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSpecificDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDestination } = destinationSlice.actions;
export default destinationSlice.reducer;
