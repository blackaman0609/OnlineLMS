import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import courseSlice from "./courseSlice.js";   // ✅ add this

export const store = configureStore({
  reducer: {
    user: userSlice,
    course: courseSlice   // ✅ add this
  }
});