import { configureStore } from "@reduxjs/toolkit";
import { popupSlice } from "./slices/popupSlice";
import { cartSlice } from "./slices/cartSlice";
import { userSlice } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;

export const popupAction = popupSlice.actions;
export const cartAction = cartSlice.actions;
export const userAction = userSlice.actions;
