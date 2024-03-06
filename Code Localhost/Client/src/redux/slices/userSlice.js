import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { name: "", login: false },
  reducers: {
    login: (state, action) => {
      state.name = action.payload;
      state.login = true;
    },
    logout: (state, action) => {
      state.name = "";
      state.login = false;
    },
  },
});
