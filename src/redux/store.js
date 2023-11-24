import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice/product';
import createUser from './authSlice/signup';
import cartReducer from './cart/cart';
import userReducer from './authSlice/signin';

export const store = configureStore({
    reducer: {
        products: productReducer,
        userCreate: createUser,
        cart: cartReducer,
        user: userReducer
    },
    devTools: false
});