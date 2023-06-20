import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import fieldReducer from '../features/fields/fieldSlice'
import bookingReducer from '../features/booking/bookingSlice'
import blacklistReducer from '../features/blacklist/blacklistSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fields: fieldReducer,
    booking: bookingReducer,
    blacklist: blacklistReducer,
  },
})
