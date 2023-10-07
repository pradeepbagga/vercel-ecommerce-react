import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    error: null,
    products: null,
    totalCount: null
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            console.log('fulfilled - ', action.payload);
            state.isLoading = false;
            state.products = action.payload.products;
            state.totalCount = action.payload.totalCount;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.products = null;
            state.totalCount = null;
            state.error = action.payload;
        });
    }
});

export default productSlice.reducer;

export const fetchProducts = createAsyncThunk(
    'content/fetchProducts',
    async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_PRODUCTS}`);
            console.log('fetchProducts - ', res)
            return res.data;
        } catch (error) {
            console.log('fetchProducts error - ', error)
        }
    }
);