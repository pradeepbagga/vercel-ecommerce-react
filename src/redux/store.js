import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice/product';

export const store = configureStore({
    reducer: {
        products: productReducer
    }
});