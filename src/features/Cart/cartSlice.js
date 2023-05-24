import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems';
const initialState = {
    cartItems: cartItems,
    amount: cartItems.length,
    total: 0,
    isLoading: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
    }
})




export default cartSlice.reducer;