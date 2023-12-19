import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwt from "jsonwebtoken";
import axios from '@/app/Utils/axios';

const initialState = {
    ID: null,
    user: null,
    token: null,
    isLoading: false,
    status: null
}

const handleErrors = (err, rejectWithValue) => {
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
};

export const registerUser = createAsyncThunk('auth/registerUser', async ({ name, password }, { rejectWithValue }) => {
    try {
        console.log('Request data:', { name, password });

        const { data } = await axios.post('/users/registration', {
            name,
            password
        });

        console.log('Response data:', data);

        if (data.TokenUser) {
            window.localStorage.setItem('token', data.TokenUser);
        }

        return data;
    } catch (err) {
        return handleErrors(err, rejectWithValue);
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ name, password }, { rejectWithValue }) => {
    try {
        console.log('Request data:', { name, password });

        const { data } = await axios.post('/users/login', {
            name,
            password
        });

        console.log('Response data:', data);

        if (data.TokenUser) {
            window.localStorage.setItem('token', data.TokenUser);
        }

        return data;
    } catch (err) {
        return handleErrors(err, rejectWithValue);
    }
});

export const me = createAsyncThunk('auth/me', async (ID, { rejectWithValue }) => {
    try {
        console.log('Request data:', {});

        const { data } = await axiosInstance.get(`/users/one-user/${ID}`);

        return data;
    } catch (err) {
        return handleErrors(err, rejectWithValue);
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
          .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = 'Login successful';
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.ID = action.payload.ID;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.status = action.payload.message;
            state.isLoading = false;
          })
          .addCase(me.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.ID = action.payload.ID;
          })
          .addCase(me.rejected, (state, action) => {
            state.status = action.payload.message;
            state.isLoading = false;
          })
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
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
              state.status = action.payload.message;
              state.isLoading = false;
            }
          );
      },
});






export const checkIsAuth = state => Boolean(state.auth.token)

export const {logout} = authSlice.actions

export default authSlice.reducer;