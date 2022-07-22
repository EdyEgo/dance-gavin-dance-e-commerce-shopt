import { createSlice } from "@reduxjs/toolkit";

interface itemFilter {
  value: string;
  name: string;
  itemsNumberAvailable: number;
  selected?: boolean;
}

const initialState: {
  productTypeFiltersSelected: { [key: string]: itemFilter };
  sizeFiltersSelected: { [key: string]: itemFilter };
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
    changeProductTypeFiltersSelected(state, { payload }) {
      const productTypeName = payload.productTypeName;
      const productSelectedNewValue = payload.productTypeNewValue;

      state.productTypeFiltersSelected = {
        ...state.productTypeFiltersSelected,
        [productTypeName]: {
          ...state.productTypeFiltersSelected[productTypeName],
          selected: productSelectedNewValue,
        },
      };
    },

    changeSizeFiltersSelected(state, { payload }) {
      const productSizeName = payload.productTypeName;
      const productSelectedNewValue = payload.productTypeNewValue;

      state.sizeFiltersSelected = {
        ...state.sizeFiltersSelected,
        [productSizeName]: {
          ...state.sizeFiltersSelected[productSizeName],
          selected: productSelectedNewValue,
        },
      };
    },
  },
});

export const {
  changeSortBy,
  changeSelectedCurrency,
  changeAvailabilitySelected,
  changePriceRangeNumberSelected,
  changeProductTypeFiltersSelected,
  changeSizeFiltersSelected,
} = productFiltersSlice.actions;

export default productFiltersSlice.reducer;
