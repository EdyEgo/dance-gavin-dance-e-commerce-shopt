import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  productTypeFiltersSelected: { [key: string]: any };
  sizeFiltersSelected: { [key: string]: any };
  priceRangeNumberSelected: [number, number];
  availabilitySelected: {
    inStock: boolean;
    outOfStock: boolean;
  };
  sortBy: { type: string; name: string };
  selectedCurrency: string;
} = {
  sortBy: {
    type: "featured",
    name: "Featured",
  },
  selectedCurrency: "euro",
  availabilitySelected: { inStock: false, outOfStock: false },
  priceRangeNumberSelected: [0, 0],
  productTypeFiltersSelected: {},
  sizeFiltersSelected: {},
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

    changeAvailabilitySelected(state, { payload }) {
      const changeType: "inStock" | "outOfStock" = payload.type;
      const newValue = payload.newValue;
      state.availabilitySelected[changeType] = newValue;
    },

    changePriceRangeNumberSelected(state, { payload }) {
      const newPriceRange = payload.newPriceRange;
      state.priceRangeNumberSelected = newPriceRange;
    },
    changeAroductTypeFiltersSelected() {
      // copy the object and change the selected value
    },

    changeSizeFiltersSelected() {
      // copy the object and change the selected value
    },
  },
});

export const {
  changeSortBy,
  changeSelectedCurrency,
  changeAvailabilitySelected,
  changePriceRangeNumberSelected,
} = productFiltersSlice.actions;

export default productFiltersSlice.reducer;
