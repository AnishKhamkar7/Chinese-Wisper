import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: null,
  socketId: null,
  active: false,
};

const socketSlicer = createSlice({
  name: "socket",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload;
      state.userName = action.payload;
      state.socketId = action.payload;
    },
    activeUser: (state) => {
      state.active = true;
    },
  },
});

export const { login, activeUser } = socketSlicer.actions;
export default socketSlicer.reducer;
