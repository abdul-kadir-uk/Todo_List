// /store/index.js

import { createSlice, configureStore } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { user: "", isloggedin: false },
  reducers: {
    login(state) {
      state.isloggedin = true;
    },
    logout(state) {
      state.isloggedin = false;
    }
  }
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});

