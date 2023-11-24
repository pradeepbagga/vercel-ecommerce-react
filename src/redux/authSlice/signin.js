import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from '../store';

const initialState = {
    user: null,
    error: null,
    userLoggedIn: false,
    loading: false,
    message: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        errorRemove: (state, action) => {
            state.error = false;
            state.message = null;
        },
        isLoggedin: (state, action) => {
            state.user = action.payload;
            state.userLoggedIn = true;
        },
        userLogout: (state, action) => {
            state.user = null;
            state.userLoggedIn = false;
            localStorage.removeItem("appToken");
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.loading = false;
            state.userLoggedIn = true;

            let d = new Date();
            d.setTime(d.getTime() + 60 * 60 * 1000);
            document.cookie = 'token=' + action.payload.token + ';expires=' + d.toGMTString() + ';';
            localStorage.setItem("appToken", action.payload.token);
            // localStorage.setItem("user",JSON.stringify(action.payload.user));
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
        });

        builder.addCase(userProfile.pending, (state, action) => {
        });
        builder.addCase(userProfile.fulfilled, (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        });
        builder.addCase(userProfile.rejected, (state, action) => {
        });

        builder.addCase(logout.pending, (state, action) => {
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = null;
            state.userLoggedIn = false;
            let d = new Date();
            d.setTime(d.getTime() - 1);
            document.cookie = "token=; expires=" + d.toGMTString();
            document.cookie = "";
            localStorage.removeItem("appToken");
            localStorage.removeItem("user");
        });
        builder.addCase(logout.rejected, (state, action) => {
        });
    }
});
export const { errorRemove, isLoggedin, userLogout } = userSlice.actions;
export default userSlice.reducer;

export const login = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue }) => {
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGIN}`;
        try {
            const res = await axios.post(apiUrl, userData);
            return res.data;
            // document.cookie = `jwt=${res.data.token}; max-age=60; path=/;`;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGOUT}`;
        try {
            const res = await axios.get(apiUrl);
            return res.data;
            // document.cookie = `jwt=${res.data.token}; max-age=60; path=/;`;
        } catch (error) {
            console.log('login User error - ', error);
        }
    }
);

export const userProfile = createAsyncThunk(
    "user/profile",
    async (token, { rejectWithValue }) => {
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_PROFILE}`;
        try {
            const res = await axios.get(apiUrl, { headers: { "Authorization": `Bearer ${token}` } })
            return res.data.user;
        } catch (error) {
            console.log('User profile error - ', error);
        }
    }
);

export const SetDelay = (func) => {
    // store.dispatch()
    setTimeout(() => {
        store.dispatch(func());
    }, 5000);
}