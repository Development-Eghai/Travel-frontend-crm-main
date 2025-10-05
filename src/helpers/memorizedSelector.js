import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// input selectors
const selectSharing = (state) => state.sharing;
const selectAppConfig = (state) => state.app_config_slice;

// memoized selector
const selectSharingAndConfig = createSelector(
    [selectSharing, selectAppConfig],
    (sharing, appConfig) => ({ sharing, appConfig })
);

// custom hook
export function MemorizedSelector() {
    return useSelector(selectSharingAndConfig);
}
