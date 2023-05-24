import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/Cart/cartSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice
    }
})