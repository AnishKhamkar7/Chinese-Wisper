import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  socketId: null,
  active: false,
};

const socketSlicer = createSlice({
  name: "socket",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userName = action.payload;
      state.active = false;
      state.socketId = action.payload;
    },
    activeUser: (state) => {
      state.active = true;
    },
  },
});

export const { login, activeUser } = socketSlicer.actions;
export default socketSlicer.reducer;
