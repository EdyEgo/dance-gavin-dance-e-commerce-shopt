import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";

import usersReducer from "./users";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // a lot of the app data it's non-serializable so this setting is for
      // not showing warnings
    }),
});
