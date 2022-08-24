import { createSlice } from "@reduxjs/toolkit";

const initialState: { currentUser: null | any } = {
  currentUser: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearCurrentUser(state) {
      state.currentUser = null;
    },
    changeCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserOrderObject(state, { payload }) {
      const orderId = payload.orderId;
      const orderObject = payload.orderObject;

      const userHasAnOrderObject = Object.hasOwn(state.currentUser, "orders");

      if (!userHasAnOrderObject) {
        state.currentUser["orders"] = {};
      }

      state.currentUser.orders[orderId] = orderObject;
    },
  },
});

export const { clearCurrentUser, changeCurrentUser, updateUserOrderObject } =
  usersSlice.actions;

export default usersSlice.reducer;
