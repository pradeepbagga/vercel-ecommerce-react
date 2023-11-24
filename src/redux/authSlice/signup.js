import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    error:null,
    success:null,
    loading:false,
    message:null
}

const userCreateSlice = createSlice({
    name: 'createuser',
    initialState,
    reducers: {
        errorRemove: (state, action) => {
            state.error = null;
            state.message = null;
        },
        successRemove: (state, action) => {
            state.success = null;
            state.message = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createUser.pending, (state,action)=>{
            state.loading = true;
            state.success = null;
            state.error = null;
            state.message = null;
        });
        builder.addCase(createUser.fulfilled, (state,action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = action.payload;
        });
        builder.addCase(createUser.rejected, (state,action)=>{
            state.loading = false;
            state.success = null;
            state.error = true;
            state.message = action.payload;
        });
    }
});
export const {errorRemove, successRemove} = userCreateSlice.actions;
export default userCreateSlice.reducer;

export const createUser = createAsyncThunk(
    "user/createUser",
    async (userData, {rejectWithValue}) => {
        console.log('userData - ', userData);
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CREATEUSER}`
        try {
            const res = await axios.post(apiUrl, userData);
            console.log('res createUser - ', res);
            return res.data.message;
        } catch (error) {
            console.log('error createUser - ', error.response.data.message);
            return rejectWithValue(error.response.data.message)
        }
    }
);