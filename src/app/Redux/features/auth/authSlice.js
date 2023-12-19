import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwt from "jsonwebtoken";
import axios from '@/app/Utils/axios';

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}

export const registerUser = createAsyncThunk('/', async ({ name, password }, { rejectWithValue }) => {
    try {

        console.log('Request data:', { name, password});

        const { data } = await axios.post('/users/registration', {
            name,
            password
        });

        if (data.token) {
            window.localStorage.setItem('token', data.token);
        }

        return data;
    } catch (err) {
        console.error(err);

        if (err.response) {
            console.error('Response data:', err.response.data);
            console.error('Response status:', err.response.status);
            console.error('Response headers:', err.response.headers);
            return rejectWithValue(err.response.data || { message: 'Server error' });
        } else if (err.request) {
            console.error('Request:', err.request);
        } else {
            console.error('Error:', err.message);
        }

        return rejectWithValue({ message: 'Server error' });
    }
});

export const loginUser = createAsyncThunk('/', async ({ name, password}, { rejectWithValue }) => {
    try {

        console.log('Request data:', { name, password });

        const { data } = await axios.post('/users/login', {
            name,
            password
        });

        if (data.token) {
            window.localStorage.setItem('token', data.token);
        }

        return data;
    } catch (err) {
        console.error(err);

        if (err.response) {
            console.error('Response data:', err.response.data);
            console.error('Response status:', err.response.status);
            console.error('Response headers:', err.response.headers);
            return rejectWithValue(err.response.data || { message: 'Server error' });
        } else if (err.request) {
            console.error('Request:', err.request);
        } else {
            console.error('Error:', err.message);
        }

        return rejectWithValue({ message: 'Server error' });
    }
});


export const me = createAsyncThunk('/', async (_, { rejectWithValue }) => {
    try {
        console.log('Request data:', {});

        const { data } = await axios.get('/users/one-user/');

        return data;
    } catch (err) {
        console.error(err);

        if (err.response) {
            console.error('Response data:', err.response.data);
            console.error('Response status:', err.response.status);
            console.error('Response headers:', err.response.headers);
            return rejectWithValue(err.response.data || { message: 'Server error' });
        } else if (err.request) {
            console.error('Request:', err.request);
        } else {
            console.error('Error:', err.message);
        }

        return rejectWithValue({ message: 'Server error' });
    }
});
  




export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    if (!state.isLoading) {
                        state.isLoading = true;
                        state.status = null;
                    }
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    state.isLoading = false;
                    state.status = action.payload.message;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = action.payload.message;
                    state.isLoading = false;
                }
            );
    }
});





export const checkIsAuth = state => Boolean(state.auth.token)

export const {logout} = authSlice.actions

export default authSlice.reducer;