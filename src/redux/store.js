import { configureStore } from "@reduxjs/toolkit";
import shopReducer from './slice/api'
import cartReducer, { getTotals } from '../redux/slice/cart'

export const store = configureStore({
    reducer: {
        shop: shopReducer,
        cart: cartReducer
    }
});
store.dispatch(getTotals())