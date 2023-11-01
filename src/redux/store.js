import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice/product';
import userReducer from './authSlice/auth';

export const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer
    }
});