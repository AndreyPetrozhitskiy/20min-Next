const { configureStore } = require('@reduxjs/toolkit');
import authSlice from '@/app/Redux/features/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice
    }
})