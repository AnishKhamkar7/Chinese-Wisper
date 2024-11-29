import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem("user");
const data = JSON.parse(userData!);

const initialState = {
  userName: data.username || "",
  socketId: data.id || "",
  active: data.active || false,
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
    room: (state) => {
      state.active = true;
    },
  },
});

export const { login, room } = socketSlicer.actions;
export default socketSlicer.reducer;
