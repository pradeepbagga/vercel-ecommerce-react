import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// console.log('initialState - ', localStorage.getItem("cartProducts"));
// let initialData = localStorage.getItem("cartProducts");

const initialState = {
    cartProducts: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        hydrate: (state, action) => {
            state.cartProducts = JSON.parse(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addCartItem.fulfilled, (state, action) => {
            state.cartProducts.push(action.payload);
            localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
            return state;
        });
        builder.addCase(removeCartItem.fulfilled, (state, action) => {
            const newData = state.cartProducts.filter((item) => item.id !== action.payload);
            localStorage.setItem('cartProducts', JSON.stringify(newData));
            state.cartProducts = newData;
            return state;
        });
        builder.addCase(productCountChange.fulfilled, (state, action) => {
            const newData = state.cartProducts.map((item)=>{
                if(item.id == action.payload.id) {
                    return action.payload;
                }
                else {
                    return item;
                }
            });
            localStorage.setItem('cartProducts', JSON.stringify(newData));
            state.cartProducts = newData;
            return state;
        });
    }
});

export const { hydrate } = cartSlice.actions;
export default cartSlice.reducer;

export const addCartItem = createAsyncThunk(
    'content/addCartItem',
    async (data) => {
        // console.log('addCartItem data - ', data)
        return data;
    }
);
export const removeCartItem = createAsyncThunk(
    'content/removeCartItem',
    async (data) => {
        // console.log('removeCartItem data - ', data)
        return data;
    }
);
export const productCountChange = createAsyncThunk(
    'content/productCountChange',
    async (data) => {
        // console.log('productCountChange - ', data)
        return data;
    }
);

