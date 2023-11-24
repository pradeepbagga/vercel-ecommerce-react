import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    error: null,
    products: null,
    category: null,
    brand: null,
    totalProducts: null
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            // console.log('fulfilled - ', action.payload);
            state.isLoading = false;
            state.products = action.payload.products;
            state.totalProducts = action.payload.totalCount;
            // state.categoriesBrands = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.products = null;
            // state.totalCount = null;
            // state.error = action.payload;
        });
        builder.addCase(fetchProductsByFilter.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProductsByFilter.fulfilled, (state, action) => {
            // console.log('fulfilled - ', action.payload);
            state.isLoading = false;
            state.products = action.payload.products;
            state.totalProducts = action.payload.totalCount;
        });
        builder.addCase(fetchProductsByFilter.rejected, (state, action) => {
            state.isLoading = false;
            state.products = null;
            // state.totalCount = null;
            // state.error = action.payload;
        });
        builder.addCase(fetchProductById.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            // console.log('fulfilled - ', action.payload);
            state.isLoading = false;
            state.selectedProduct = action.payload;
        });
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.isLoading = false;
            state.selectedProduct = null;
        });
        builder.addCase(fetchCategories.pending, (state, action) => {
            // state.isLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            // console.log('fulfilled - ', action.payload);
            // state.isLoading = false;
            state.category = action.payload;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.category = null;
        });
        builder.addCase(fetchBrands.pending, (state, action) => {
            // state.isLoading = true;
        });
        builder.addCase(fetchBrands.fulfilled, (state, action) => {
            // console.log('fulfilled - ', action.payload);
            // state.isLoading = false;
            state.brand = action.payload;
        });
        builder.addCase(fetchBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.brand = null;
        });        
    }
});

export default productSlice.reducer;

export const fetchProducts = createAsyncThunk(
    'content/fetchAllProducts',
    async (data) => {
        let apiUrl = `${process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_PRODUCTS}?_page=${data.page}&_limit=${data.limit}`;
        // console.log('apiUrl - ', apiUrl);
        try {
            const res = await axios.get(apiUrl);
            // console.log('fetchProducts - ', res.data);
            return res.data;
        } catch (error) {
            console.log('fetchProducts error - ', error)
        }
    }
);

export const fetchProductsByFilter = createAsyncThunk(
    'content/fetchProductsByFilter',
    async (filters) => {
        let queryString = "";
        console.log('filter redux - ', filters);
        const { filter, sort } = filters;

        if(Object.keys(filter).length > 0) {
            for(let key in filter) {
                // console.log('key - ', key);
                // console.log('key - ', filter[key]);
                // console.log('key - ', filter[key].length);
                if(filter[key].length > 0) {
                    queryString += `${key}=${filter[key]}&`;
                }
                // queryString += `${key}=${filter[key]}&`;
            }
        }

        // if(Object.keys(sort).length > 0) {
            for(let key in sort) {
                queryString += `${key}=${sort[key]}&`;
            }
        // }
        // else {
        //     queryString = "";
        // }
        
        console.log('queryString - ', queryString);

        let apiUrl = `${process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_PRODUCTS}?_page=${filters.page}&_limit=${filters.limit}&${queryString}`;
        try {
            const res = await axios.get(apiUrl);
            console.log('fetchProducts - ', res.data);
            return res.data;
        } catch (error) {
            console.log('fetchProducts error - ', error)
        }
    }
);
export const fetchProductById = createAsyncThunk(
    "content/fetchProductById",
    async (id) => {
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_PRODUCTS}/${id}`;
        // console.log('fetchProductById - ', apiUrl)
        try {
            const res = await axios.get(apiUrl);
            // console.log('res - ', res)
            return res.data;
        } catch (error) {
            console.log('Product detail error - ', error)
        }
    }
);

export const fetchCategories = createAsyncThunk(
    "content/fetchCategories",
    async () => {
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_CATEGORIES}`;
        try {
            const res = await axios.get(apiUrl);
            // console.log('fetch Categories - ', res)
            return res.data;
        } catch (error) {
            console.log('Product detail error - ', error)
        }
    }
);
export const fetchBrands = createAsyncThunk(
    "content/fetchBrands",
    async () => {
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_BRANDS}`;
        try {
            const res = await axios.get(apiUrl);
            // console.log('fetch BRANDS - ', res)
            return res.data;
        } catch (error) {
            console.log('fetch BRANDS error - ', error)
        }
    }
);