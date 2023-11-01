import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loggedInUser: null,
    state: 'ilde'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
});

export default userSlice.reducer;

export const createUser = createAsyncThunk(
    "user/createUser",
    async (userData) => {
        console.log('createUser - ', userData);
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CREATEUSER}`
        try {
            const res = await axios.post(apiUrl, {
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('res createUser - ', res);
        } catch (error) {
            console.log('error createUser - ', error);
        }
    }
);