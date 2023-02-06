import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const player = JSON.parse(localStorage.getItem('player'))
const owner = JSON.parse(localStorage.getItem('owner'))

const initialState = {
  player: player ? player : null,
  owner: owner ? owner : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// register new user
export const register = createAsyncThunk(
  'auth/register',
  async (player, thunkAPI) => {
    try {
      return await authService.register(player)
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

// login user
export const login = createAsyncThunk(
  'players/login',
  async (player, thunkAPI) => {
    try {
      return await authService.login(player)
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

// logout user
export const logout = createAsyncThunk('players/logout', async () => {
  await authService.logout()
})

// --------------------------------------------------------------------------------------------------------- //

// register new owner
export const registerOwner = createAsyncThunk(
  'auth/register',
  async (player, thunkAPI) => {
    try {
      return await authService.register(player)
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

// login owner
export const loginOwner = createAsyncThunk(
  'owners/login',
  async (owner, thunkAPI) => {
    try {
      return await authService.loginOwner(owner)
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

// logout owner
export const logoutOwner = createAsyncThunk('owner/logout', async () => {
  await authService.logoutOwner()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.player = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.player = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.player = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.player = null
      })
      .addCase(loginOwner.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginOwner.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.owner = action.payload
      })
      .addCase(loginOwner.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.owner = null
      })
      .addCase(logoutOwner.fulfilled, (state) => {
        state.owner = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
