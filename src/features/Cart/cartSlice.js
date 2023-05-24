import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems';
import axios from "axios";

const url = 'https://course-api.com/react-useReducer-cart-project';
const initialState = {
    cartItems: [],
    amount: cartItems.length,
    total: 0,
    isLoading: false,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkApi) => {
    try {
        const res = await axios(url);
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state, action) => {
            state.cartItems = [];
            state.amount = state.cartItems.length;
        },
        removeItem: (state, action) => {
            const id = action.payload.id;
            state.cartItems = state.cartItems.filter(item => item.id !== id);
            state.amount = state.cartItems.length;
        },
        increase: (state, action) => {
            const id = action.payload.id;
            const cartItem = state.cartItems.find(item => item.id === id);
            cartItem.amount += 1;
        },
        decrease: (state, action) => {
            const id = action.payload.id;
            const cartItem = state.cartItems.find(item => item.id === id);
            cartItem.amount -= 1;
        },
        calculateTotals: (state, action) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach(item => {
                amount += item.amount;
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload;
        }).addCase(getCartItems.rejected, (state, action) => {
            state.isLoading = false;
        })
    }
})


export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
