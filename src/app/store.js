import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import fieldReducer from '../features/fields/fieldSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fields: fieldReducer
  },
})
