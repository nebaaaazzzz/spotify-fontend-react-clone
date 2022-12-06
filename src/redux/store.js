import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { ShazamApi } from "./services/shazamCore";

export const store = configureStore({
  reducer: {
    [ShazamApi.reducerPath]: ShazamApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(ShazamApi.middleware),
});
