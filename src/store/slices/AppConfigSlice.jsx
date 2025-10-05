// RoomSharingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "config_slice",
    initialState: {
        config_data: {}
    },
    reducers: {
        setConfigData: (state, action) => {
            state.config_data = action.payload || {};
        }
    },
});

export const {
    setConfigData
} = counterSlice.actions;

export default counterSlice.reducer;
