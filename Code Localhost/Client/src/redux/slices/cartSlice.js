import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    decrement: (state, action) => {
      const productIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      state[productIndex].quantity = (
        +state[productIndex].quantity - 1
      ).toString();
      localStorage.setItem("cart", JSON.stringify(state));
    },

    increment: (state, action) => {
      console.log(action.payload);
      const productIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      state[productIndex].quantity = (
        +state[productIndex].quantity + 1
      ).toString();
      localStorage.setItem("cart", JSON.stringify(state));
    },

    addToCart: (state, action) => {
      const productIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        // state[productIndex].id = action.payload.id;
        // state[productIndex].name = action.payload.name;
        // state[productIndex].price = action.payload.price;
        // state[productIndex].img = action.payload.img;
        state[productIndex].quantity = (
          +state[productIndex].quantity + +action.payload.quantity
        ).toString();
      } else {
        state.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    updateCart: (state, action) => {
      console.log("updated");
      const productIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      state[productIndex].quantity = (+action.payload.quantity).toString();
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeOutOfCart: (state, action) => {
      const removeProductIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      state.splice(removeProductIndex, 1);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state, action) => {
      state.length = 0;
    },
  },
});
