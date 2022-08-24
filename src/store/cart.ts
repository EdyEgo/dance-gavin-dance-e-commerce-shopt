import { createSlice } from "@reduxjs/toolkit";

function calculatePriceByQuantity(price: number, quantity: number) {
  if (quantity === 1) {
    return price;
  }

  const priceByQuantity = price * quantity;

  return priceByQuantity;
}

function extractPriceNumber(productItem: any) {
  if (productItem?.sizeSelected != null) {
    const { sizeValue } = productItem.sizeSelected;
    const priceSize = sizeValue.price.includes(",")
      ? parseInt(sizeValue.price.split(",")[0])
      : parseInt(sizeValue.price);
    return priceSize;
  }
  return productItem?.price;
}

const initialState: {
  totalPrice: number;
  shippingProtectionChecked: boolean;
  totalQuantityItems: number;
  productsAddedToCart: {
    // productId: string;
    totalQuantityPrice: number;
    quantity: number;
    sizeSelected: { price: string; sold: number; numberItemsAvailable: string };
    [key: string]: any;
  }[];
} = {
  shippingProtectionChecked: false,
  totalQuantityItems: 0,
  totalPrice: 0,
  productsAddedToCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    refreshCartToDefaultStates(state) {
      state.totalPrice = 0;
      state.productsAddedToCart = [];
      state.shippingProtectionChecked = false;
    },

    addProductToCart(state, { payload }) {
      //payload.quantity
      //totalQuantityItems

      const productAlreadyInCart = state.productsAddedToCart.findIndex(
        (product) => product.id === payload.id
      );

      const priceNumber = extractPriceNumber(payload);
      const priceCalculatedByQantity = calculatePriceByQuantity(
        priceNumber,
        payload.quantity
      );
      // if product allready to cart remove his quantity
      if (productAlreadyInCart !== -1) {
        const productFoundToCart =
          state.productsAddedToCart[productAlreadyInCart];

        state.totalQuantityItems -= productFoundToCart.quantity;
        state.totalQuantityItems += payload.quantity;

        state.productsAddedToCart.splice(productAlreadyInCart, 1, {
          ...payload,
          totalQuantityPrice: priceCalculatedByQantity,
        });

        return;
      }

      state.productsAddedToCart.push({
        ...payload,
        totalQuantityPrice: priceCalculatedByQantity,
      });
      state.totalQuantityItems += payload.quantity;
    },

    removeProductFromCart(state, { payload }) {
      //totalQuantityItems
      //payload.quantity
      const productIndex = payload.productIndex;
      const productFoundToCart = state.productsAddedToCart[productIndex];
      state.totalQuantityItems -= productFoundToCart.quantity;
      state.productsAddedToCart.splice(productIndex, 1);
    },

    changeShippingProtectionCheck(state, { payload }: { payload: boolean }) {
      state.shippingProtectionChecked = payload;
    },
    changeProductQuantityByIndex(state, { payload }) {
      const indexProduct = payload.productIndex;
      const newQuantity = payload.newQuantity;
      const productObject = state.productsAddedToCart[indexProduct];

      state.totalQuantityItems -= productObject.quantity;
      state.totalQuantityItems += payload.newQuantity;
      const priceNumber = extractPriceNumber(productObject);
      const priceCalculatedByQantity = calculatePriceByQuantity(
        priceNumber,
        newQuantity
      );

      state.productsAddedToCart.splice(indexProduct, 1, {
        ...productObject,
        quantity: newQuantity,
        totalQuantityPrice: priceCalculatedByQantity,
      });
    },
  },
});

export const {
  refreshCartToDefaultStates,
  addProductToCart,
  removeProductFromCart,
  changeShippingProtectionCheck,
  changeProductQuantityByIndex,
} = cartSlice.actions;

export default cartSlice.reducer;
