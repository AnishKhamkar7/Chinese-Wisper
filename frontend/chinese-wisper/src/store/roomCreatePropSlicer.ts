// store/dialogSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface stateType {
  isCreateRoomDialogOpen: boolean;
  data?: {
    roomName: string;
    limit: number;
    createdBy: string;
  };
}

const initialState: stateType = {
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
    roomData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { openCreateRoomDialog, closeCreateRoomDialog, roomData } =
  dialogSlice.actions;

export default dialogSlice.reducer;
