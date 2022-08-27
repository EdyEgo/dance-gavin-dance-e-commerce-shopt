import { createSlice } from "@reduxjs/toolkit";

interface itemFilter {
  value: string;
  name: string;
  itemsNumberAvailable: number;
  selected?: boolean;
}

const initialState: {
  filteredProducts: any[];
  appliedFilters: {
    availability: {
      list: any[];
      name: "Availability";
    };
    size: {
      list: any[];
      name: "Size";
    };
    price: {
      list: any[];
      name: "Price";
    };
    productType: {
      list: any[];
      name: "Product type";
    };
  };
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
  appliedFilters: {
    availability: {
      list: [],
      name: "Availability",
    },
    size: {
      list: [],
      name: "Size",
    },
    price: {
      list: [],
      name: "Price",
    },
    productType: {
      list: [],
      name: "Product type",
    },
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

    // changeAppliedFilters(state, { payload }) {
    //   //   // left here
    //   // state.appliedFilters
    //   // lest make it an array ,  availability:["in stock","out of stock"]

    //   const newFilterName = payload.filterName;
    //   const newFilterValue = payload.filterValue;
    //   // const typeSelected = payload.typeSelected;

    //   const copyAppliedFilters = { ...state.appliedFilters };
    //   if (copyAppliedFilters[newFilterName] == null) {
    //     copyAppliedFilters[newFilterName] = [newFilterValue];
    //     state.appliedFilters = copyAppliedFilters;
    //     return;
    //   }

    //   const indexOfValueSelected =
    //     copyAppliedFilters[newFilterName].indexOf(newFilterValue);
    //   if (indexOfValueSelected !== -1) {
    //     // remove
    //     copyAppliedFilters[newFilterName].splice(indexOfValueSelected, 1);
    //     state.appliedFilters = copyAppliedFilters;
    //     return;
    //   }

    //   copyAppliedFilters[newFilterName].push(newFilterValue);
    //   // state.appliedFilters = {
    //   //   ...state.appliedFilters,
    //   //   [newFilterName]: newFilterValue,
    //   // };

    //   state.appliedFilters = copyAppliedFilters;
    // },

    // deleteAppliedFilter(state, { payload }) {

    //   // if (!state.appliedFilters) {
    //   //   return;
    //   // }
    //   // const newFilterName = payload.filterName;
    //   // const copyAppliedFilters = state.appliedFilters;

    //   // delete copyAppliedFilters[newFilterName];
    //   // state.appliedFilters = copyAppliedFilters;
    // },

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

    resetAppliedFilters(state) {
      state.appliedFilters = {
        availability: {
          list: [],
          name: "Availability",
        },
        size: {
          list: [],
          name: "Size",
        },
        price: {
          list: [],
          name: "Price",
        },
        productType: {
          list: [],
          name: "Product type",
        },
      };
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

      // if equal null then create the object , if new value is selected then create , if false delete the object

      if (newValue === false) {
        const index = state.appliedFilters.availability.list.findIndex(
          (item: any) => item.typeSelected === changeType
        );
        state.appliedFilters.availability.list.splice(index, 1);
        return;
      }

      state.appliedFilters.availability.list.push({
        ...state.availabilitySelected[changeType],
        typeSelected: changeType,
        name: changeType === "inStock" ? "In stock" : "Out of stock",
      });
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

      if (productSelectedNewValue === false) {
        const index = state.appliedFilters.productType.list.findIndex(
          (item: any) => item.name === productTypeName
        );

        state.appliedFilters.productType.list.splice(index, 1);
        return;
      }

      state.appliedFilters.productType.list.push({
        ...state.productTypeFiltersSelected[productTypeName],
        typeSelected: "Product Type",

        name: productTypeName,
      });
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

      if (productSelectedNewValue === false) {
        const index = state.appliedFilters.size.list.findIndex(
          (item: any) => item.name === productSizeName
        );

        state.appliedFilters.size.list.splice(index, 1);
        return;
      }

      state.appliedFilters.size.list.push({
        ...state.sizeFiltersSelected[productSizeName],
        typeSelected: "Size",

        name: productSizeName,
      });
    },
  },
});

export const {
  changeSortBy,
  // changeAppliedFilters,
  // deleteAppliedFilter,
  resetAppliedFilters,
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
