import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  active: "",
  tempActive: "",
};

export const sidebarSlice = createSlice({
  name: "sidebarState",
  initialState,
  reducers: {
    setSidebarActive: (state, action) => {
      state.active = action.payload;
    },
    setSidebarTempActive: (state, action) => {
      state.tempActive = action.payload;
    },
  },
});

export const { setSidebarActive, setSidebarTempActive } = sidebarSlice.actions;

export default sidebarSlice.reducer;
