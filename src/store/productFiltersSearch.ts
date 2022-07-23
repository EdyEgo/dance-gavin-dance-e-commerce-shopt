import { createSlice } from "@reduxjs/toolkit";

interface itemFilter {
  value: string;
  name: string;
  itemsNumberAvailable: number;
  selected?: boolean;
}

const initialState: {
  filteredProducts: any[];
  productTypeFiltersSelected: { [key: string]: itemFilter } | null;
  sizeFiltersSelected: { [key: string]: itemFilter } | null;
  priceRangeNumberSelected: [number, number];
  priceRangeAvailableToSelect: [number, number];
  availabilitySelected: {
    inStock: { numberItems: number; selected: boolean; name: string };
    outOfStock: { numberItems: number; selected: boolean; name: string };
  } | null;
  sortBy: { type: string; name: string };
  selectedCurrency: string;
} = {
  filteredProducts: [],
  sortBy: {
    type: "featured",
    name: "Featured",
  },
  selectedCurrency: "euro",
  availabilitySelected: null,
  priceRangeNumberSelected: [0, 0],
  priceRangeAvailableToSelect: [0, 0],
  productTypeFiltersSelected: null,
  sizeFiltersSelected: null,
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

    addFilteredProducts(state, { payload }) {
      state.filteredProducts = payload;
    },

    addAvailabilitySelected(state, { payload }) {
      state.availabilitySelected = payload;
    },
    addPriceRangeNumberSelected(state, { payload }) {
      state.priceRangeNumberSelected = payload;
    },
    addPriceRangeAvailableToSelect(state, { payload }) {
      state.priceRangeAvailableToSelect = payload;
    },
    addProductTypeFiltersSelected(state, { payload }) {
      state.productTypeFiltersSelected = payload;
    },
    addSizeFiltersSelected(state, { payload }) {
      state.sizeFiltersSelected = payload;
    },
    changeAvailabilitySelected(state, { payload }) {
      if (!state.availabilitySelected) {
        return;
      }
      const changeType: "inStock" | "outOfStock" = payload.type;
      const newValue = payload.newValue;
      state.availabilitySelected[changeType] = {
        ...state.availabilitySelected[changeType],
        selected: newValue,
      };
    },

    changePriceRangeNumberSelected(state, { payload }) {
      const newPriceRange = payload.newPriceRange;
      state.priceRangeNumberSelected = newPriceRange;
    },
    changePriceRangeAvailableToSelect(state, { payload }) {
      const newPriceRange = payload.newPriceRange;
      state.priceRangeAvailableToSelect = newPriceRange;
    },
    changeProductTypeFiltersSelected(state, { payload }) {
      if (!state.productTypeFiltersSelected) {
        return;
      }
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
      if (!state.sizeFiltersSelected) {
        return;
      }
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
  addFilteredProducts,
  changeSelectedCurrency,
  addAvailabilitySelected,
  addPriceRangeNumberSelected,
  addPriceRangeAvailableToSelect,
  addProductTypeFiltersSelected,
  addSizeFiltersSelected,
  changeAvailabilitySelected,
  changePriceRangeNumberSelected,
  changePriceRangeAvailableToSelect,
  changeProductTypeFiltersSelected,
  changeSizeFiltersSelected,
} = productFiltersSlice.actions;

export default productFiltersSlice.reducer;
