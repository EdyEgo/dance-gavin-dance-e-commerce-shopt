import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  drawers: {
    top: boolean;
    left: boolean;
    bottom: boolean;
    right: boolean;
  };
  menuType:"cart" | "search",

  navBarDropDawnMenuStatus: boolean;
} = {
  drawers: {
    bottom: false,
    left: false,
    right: false,
    top: false,
  },
  menuType:"cart",
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
    changeDrawerTypeMenu(state, { payload }){
       const menuTypeSelected:"cart" | "search" = payload.menuTypeSelected

       state.menuType = menuTypeSelected
    }
  },
});

export const {
  changeDrawerStateByDirectionId,
  changeNavBarDropDawnMenuStatus,
  changeDrawerTypeMenu
} = drawersSlice.actions;

export default drawersSlice.reducer;
