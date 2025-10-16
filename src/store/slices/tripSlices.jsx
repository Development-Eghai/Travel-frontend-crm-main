// src/slices/tripSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIBaseUrl } from "../../common/api/api";

// =========================
// CREATE Trip API (POST)
// =========================
export const createTrip = createAsyncThunk(
  "trip/create",
  async (tripData, { rejectWithValue }) => {
    try {
      const res = await APIBaseUrl.post(
        "trips",
        tripData,
      );
      console.log(res.data,"in slices")
      return res.data;
     
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// =========================
// GET All Trips API (GET)
// =========================
export const getAllTrips = createAsyncThunk(
  "trip/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await APIBaseUrl.get("trips/", {
        headers: {
          "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// =========================
// Slice
// =========================
const tripSlice = createSlice({
  name: "trip",
  initialState: {
    trips: [],
    newTrip: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearTrip: (state) => {
      state.trips = [];
      state.newTrip = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Trip
    builder
      .addCase(createTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.newTrip = action.payload;
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All Trips
    builder
      .addCase(getAllTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(getAllTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTrip } = tripSlice.actions;
export default tripSlice.reducer;
