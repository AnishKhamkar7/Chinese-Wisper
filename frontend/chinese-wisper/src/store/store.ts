import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlicer";
import socketSlicer from "./socketSlicer";
import roomCreateProp from "./roomCreatePropSlicer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socketContext: socketSlicer,
    roomCreateProp: roomCreateProp,
  },
});

export type RootState = ReturnType<typeof store.getState>;
