import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  sortBy: { type: string; name: string };
  selectedCurrency: string;
} = {
  sortBy: {
    type: "featured",
    name: "Featured",
  },
  selectedCurrency: "euro",
};

export const productFiltersSlice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    changeSortBy(state, { payload }) {
      const type = payload.type;
      const name = payload.name;

      state.sortBy = { type, name };
    },
    changeSelectedCurrency(state, { payload }) {
      state.selectedCurrency = payload;
    },
  },
});

export const { changeSortBy, changeSelectedCurrency } =
  productFiltersSlice.actions;

export default productFiltersSlice.reducer;
