import { configureStore } from "@reduxjs/toolkit";
import { avitProSlice } from "./slice";
import { avitProUserSlice } from "./sliceUsers";
import { avitProApi } from "../api/requests";

export const store = configureStore({
  reducer: {
    [avitProApi.reducerPath]: avitProApi.reducer,
    avitProToolkit: avitProSlice.reducer,
    avitProUser: avitProUserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(avitProApi.middleware),
});
