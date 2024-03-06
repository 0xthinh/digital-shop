import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

export const popupSlice = createSlice({
  name: "popup",
  initialState: {
    redirect: false,
    showPopup: false,
    id: "",
    name: "",
    price: "",
    description: "",
    img: "",
    path: null,
  },
  reducers: {
    openPopup: (state, action) => {
      state.showPopup = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.price = action.payload.price;
      state.description = action.payload.description;
      state.img = action.payload.img;
    },

    closePopup: (state, action) => {
      state.showPopup = false;
    },

    redirect: (state, action) => {
      state.path = action.payload;
      state.redirect = true;
      state.showPopup = false;
    },

    cancelRedirect: (state, action) => {
      state.redirect = false;
      state.showPopup = false;
    },

    // redirect: (state, action) => {
    //   redirect(`/detail/${action.payload}`);
    // },
  },
});
