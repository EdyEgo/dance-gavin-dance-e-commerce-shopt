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

      const productAlreadyInCart = state.productsAddedToCart.findIndex((product)=>product.id === payload.id)
      if(productAlreadyInCart !== -1){
        state.productsAddedToCart.splice(productAlreadyInCart,1,payload)
        return
      }
      state.productsAddedToCart.push(payload);
    },
  },
});

export const { addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
