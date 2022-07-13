import { createSlice } from "@reduxjs/toolkit";

const initialState: { productsList: any[] | null } = {
  productsList: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    chageProductsListValue(state, { payload }) {
      const productListNewValue = payload;
      state.productsList = productListNewValue;
    },
  },
});

export const { chageProductsListValue } = productsSlice.actions;

export default productsSlice.reducer;
