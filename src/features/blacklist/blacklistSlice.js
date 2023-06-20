import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blacklistService from "./blacklistService";

const initialState = {
  blacklists: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all blacklists
export const getBlacklists = createAsyncThunk(
  "blacklist/getAll",
  async (fieldId, thunkAPI) => {
    try {
      return await blacklistService.getBlacklists(fieldId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ban player
export const banPlayer = createAsyncThunk(
  "blacklist/ban",
  async (banData, thunkAPI) => {
    try {
      return await blacklistService.banPlayer(banData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// unban player
export const unbanPlayer = createAsyncThunk(
  "blacklist/unban",
  async (data, thunkAPI) => {
    try {
      return await blacklistService.unbanPlayer(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const blacklistSlice = createSlice({
  name: "blacklist",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlacklists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlacklists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blacklists = action.payload;
      })
      .addCase(getBlacklists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(banPlayer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(banPlayer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(banPlayer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(unbanPlayer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unbanPlayer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unbanPlayer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = blacklistSlice.actions;
export default blacklistSlice.reducer;
