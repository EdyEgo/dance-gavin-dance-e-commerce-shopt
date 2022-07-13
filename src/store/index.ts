import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import drawersReducer from "./drawers";
import productFiltersSearchReducer from "./productFiltersSearch";
import productsReducer from "./products";

import usersReducer from "./users";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    drawers: drawersReducer,
    users: usersReducer,
    productFiltersSearch: productFiltersSearchReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // a lot of the app data it's non-serializable so this setting is for
      // not showing warnings
    }),
});
