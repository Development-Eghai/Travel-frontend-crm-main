// store.js
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import sharingReducer from "./slices/RoomSharingSlice";
import appConfigReducer from "./slices/AppConfigSlice";
import homePageReducer from "./slices/HomePageSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import destinationReducer from './slices/destinationSlices'

const persistConfig = {
  key: "travel",
  storage,
};

const rootReducer = combineReducers({
  sharing: sharingReducer,
  app_config_slice: appConfigReducer,
  destination : destinationReducer,
  home_page_slice: homePageReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
