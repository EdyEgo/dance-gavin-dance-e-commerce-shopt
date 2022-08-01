import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  productsAddedToCart: {
    quantity: number;
    sizeSelected: { price: string; sold: number; numberItemsAvailable: string };
    [key: string]: any;
  }[];
} = {
  productsAddedToCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, { payload }) {
      state.productsAddedToCart.push(payload);
    },
  },
});

export const { addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
