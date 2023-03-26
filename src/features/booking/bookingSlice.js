import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookingService from './bookingService.js'

const initialState = {
  bookings: [],
  booking: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// get all bookings
export const getBookings = createAsyncThunk(
  'booking/getAll',
  async (_, thunkAPI) => {
    try {
      return await bookingService.getBookings()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// create new booking
export const createBooking = createAsyncThunk(
  'booking/create',
  async (bookingData, thunkAPI) => {
    try {
      return await bookingService.createBooking(bookingData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookings = action.payload
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = bookingSlice.actions
export default bookingSlice.reducer
