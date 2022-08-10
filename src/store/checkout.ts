import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  informationsPage: {
    email: null | string;
    country: null | string;
    firstName: null | string;
    lastName: null | string;
    company: null | string;
    address: null | string;
    apartament: null | string;
    city: null | string;
    postcode: null | string;
    phone: null | string;
  };
  shippingMethodSelected: null | any;
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
    country: null,
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
    postcode: null,
  },
  shippingMethodSelected: null,
  paymentInfo: {
    cardExpirationDate: null,
    cardName: null,
    cardNumber: null,
    securityCode: null,
  },
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    changeInformationsPage(state, { payload }) {
      const informationType:
        | "email"
        | "country"
        | "firstName"
        | "lastName"
        | "company"
        | "address"
        | "apartament"
        | "postcode"
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
  changeInformationsPage,
  changeShippingMethodSelected,
  changePaymentInfo,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
