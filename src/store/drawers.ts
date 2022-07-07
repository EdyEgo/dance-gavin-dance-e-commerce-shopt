import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  drawers: {
    top: boolean;
    left: boolean;
    bottom: boolean;
    right: boolean;
  };
  navBarDropDawnMenuStatus: boolean;
} = {
  drawers: {
    bottom: false,
    left: false,
    right: false,
    top: false,
  },
  navBarDropDawnMenuStatus: false,
};

export const drawersSlice = createSlice({
  name: "drawers",
  initialState,
  reducers: {
    changeDrawerStateByDirectionId: (state, { payload }) => {
      const direction: "left" | "right" | "bottom" | "top" = payload.direction;
      const newStatus: boolean = payload.newStatus;
      state.drawers = { ...state.drawers, [direction]: newStatus };
    },
    changeNavBarDropDawnMenuStatus: (state, { payload }) => {
      const newStatus: boolean = payload.newStatus;
      state.navBarDropDawnMenuStatus = newStatus;
    },
  },
});

export const {
  changeDrawerStateByDirectionId,
  changeNavBarDropDawnMenuStatus,
} = drawersSlice.actions;

export default drawersSlice.reducer;
