import { createSlice } from "@reduxjs/toolkit";

const authData = localStorage.getItem("auth");
const storedAuth = authData ? JSON.parse(authData) : {};

const initialState = {
  isAuthenticated: storedAuth.isAuthenticated || false,
  data: storedAuth.data || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.data = action.payload;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.data = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
