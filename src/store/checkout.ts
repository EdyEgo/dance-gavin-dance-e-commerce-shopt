import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  orderProcessedMadeEmailMessage: string;
  informationsPage: {
    email: null | string;
    country: null | string;
    firstName: null | string;
    lastName: null | string;
    region: null | string;
    company: null | string;
    address: null | string;
    apartament: null | string;
    city: null | string;
    postalCode: null | string;
    phone: null | number;
  };
  shippingMethodSelected: {
    name: "First Class Package International" | "Priority Mail International";
    priceValue: number;
    currencySelected: "euro" | "dollar";
    indexValue: 0 | 1;
  };
  shippingMethodsList: any[];
  paymentInfo: {
    cardNumber: number | null;
    cardName: string | null;
    cardExpirationDate: string | null;
    securityCode: number | null;
  };
} = {
  informationsPage: {
    address: null,
    apartament: null,
    city: null,
    company: null,
    country: "Romania",
    email: null,
    firstName: null,
    lastName: null,
    region: null,
    phone: null,
    postalCode: null,
  },
  shippingMethodSelected: {
    name: "First Class Package International",
    priceValue: 26,
    currencySelected: "euro",
    indexValue: 0,
  },
  shippingMethodsList: [
    {
      name: "First Class Package International",
      priceValue: 26,
      currencySelected: "euro",
    },
    {
      name: "Priority Mail International",
      priceValue: 56,
      currencySelected: "euro",
    },
  ],
  paymentInfo: {
    cardExpirationDate: null,
    cardName: null,
    cardNumber: null,
    securityCode: null,
  },
  orderProcessedMadeEmailMessage:
    "Thank you for your order, your products should be at your door very soon.",
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    refreshCheckoutToDefaultStates(state) {
      state.informationsPage = {
        address: null,
        apartament: null,
        city: null,
        company: null,
        country: "Romania",
        email: null,
        firstName: null,
        lastName: null,
        region: null,
        phone: null,
        postalCode: null,
      };

      state.shippingMethodSelected = {
        name: "First Class Package International",
        priceValue: 26,
        currencySelected: "euro",
        indexValue: 0,
      };
      state.paymentInfo = {
        // we don t ask for card info in this app but in the future you never know
        cardExpirationDate: null,
        cardName: null,
        cardNumber: null,
        securityCode: null,
      };
    },

    changeInformationsPage(state, { payload }) {
      const informationType:
        | "email"
        | "country"
        | "firstName"
        | "lastName"
        | "company"
        | "address"
        | "apartament"
        | "postalCode"
        | "region"
        | "city"
        | "phone" = payload.informationType;
      const newInformationValue = payload.newInformationValue;

      state.informationsPage[informationType] = newInformationValue;
    },

    changeShippingMethodSelected(state, { payload }) {
      state.shippingMethodSelected = payload;
    },
    changePaymentInfo(state, { payload }) {
      const paymentInformationType:
        | "cardExpirationDate"
        | "cardName"
        | "cardNumber"
        | "securityCode" = payload.paymentInformationType;
      const newPaymentInformationValue = payload.newPaymentInformationValue;

      state.paymentInfo[paymentInformationType] = newPaymentInformationValue;
    },
  },
});

export const {
  refreshCheckoutToDefaultStates,
  changeInformationsPage,
  changeShippingMethodSelected,
  changePaymentInfo,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
