// RoomSharingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const homepageSlice = createSlice({
    name: "home_slice",
    initialState: {
        featured_trips: [],
        all_destination: []
    },
    reducers: {
        setFeaturedTripSice: (state, action) => {
            state.featured_trips = action.payload || [];
        },
        setAllDestination: (state, action) => {
            state.all_destination = action.payload || [];
        }
    },
});

export const {
    setFeaturedTripSice,setAllDestination
} = homepageSlice.actions;

export default homepageSlice.reducer;
