// store/dialogSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreateRoomDialogOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openCreateRoomDialog: (state) => {
      state.isCreateRoomDialogOpen = true;
    },
    closeCreateRoomDialog: (state) => {
      state.isCreateRoomDialogOpen = false;
    },
  },
});

export const { openCreateRoomDialog, closeCreateRoomDialog } =
  dialogSlice.actions;

export default dialogSlice.reducer;
