import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import fieldService from './fieldService.js'

const initialState = {
  fields: [],
  field: {},
  imgUrl: null,
  uploadSuccess: false,
  fieldSuccess: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// get all fields
export const getFields = createAsyncThunk(
  'fields/getAll',
  async (ownerId, thunkAPI) => {
    try {
      return await fieldService.getFields()
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

// create new field
export const createOwnerField = createAsyncThunk(
  'fields/create',
  async (fieldData, thunkAPI) => {
    try {
      return await fieldService.createField(fieldData)
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

// get user ticket
export const updateField = createAsyncThunk(
  'field/updateField',
  async (data, thunkAPI) => {
    try {
      return await fieldService.updateField(data)
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

// get owner fields
export const getOwnerFields = createAsyncThunk(
  'fields/getOwnerFields',
  async (ownerId, thunkAPI) => {
    try {
      return await fieldService.getOwnerFields(ownerId)
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

// get a single field
export const getField = createAsyncThunk(
  'fields/getField',
  async (fieldId, thunkAPI) => {
    try {
      return await fieldService.getField(fieldId)
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

// get fields
export const getFieldByType = createAsyncThunk(
  'fields/getFieldType',
  async (type, thunkAPI) => {
    try {
      return await fieldService.getFieldByType(type)
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


// upload image to Cloudinary
export const uploadImg = createAsyncThunk(
  'fields/uploadImg',
  async (data, thunkAPI) => {
    try {
      return await fieldService.uploadImg(data)
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

// delete owner field
export const deleteField = createAsyncThunk(
  'field/remove',
  async (fieldId, thunkAPI) => {
    try {
      return await fieldService.deleteField(fieldId)
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

// search field by name
export const searchFieldByName = createAsyncThunk(
  'field/search',
  async (fieldName, thunkAPI) => {
    try {
      return await fieldService.searchField(fieldName)
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

export const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFields.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFields.fulfilled, (state, action) => {
        state.isLoading = false
        // state.isSuccess = true
        state.fields = action.payload
      })
      .addCase(getFields.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createOwnerField.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOwnerField.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(createOwnerField.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateField.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateField.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(updateField.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getOwnerFields.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOwnerFields.fulfilled, (state, action) => {
        state.isLoading = false
        state.fields = action.payload
      })
      .addCase(getOwnerFields.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getField.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getField.fulfilled, (state, action) => {
        state.fieldSuccess = true
        state.isLoading = false
        state.field = action.payload
      })
      .addCase(getField.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFieldByType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFieldByType.fulfilled, (state, action) => {
        state.fieldSuccess = true
        state.isLoading = false
        state.fields = action.payload
      })
      .addCase(getFieldByType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.uploadSuccess = true
        state.imgUrl = action.payload.url
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteField.pending, (state, action) => {
        state.isSuccess = false
        state.isLoading = true
      })
      .addCase(deleteField.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(deleteField.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(searchFieldByName.pending, (state, action) => {
        state.isSuccess = false
        state.isLoading = true
      })
      .addCase(searchFieldByName.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.fields = action.payload
      })
      .addCase(searchFieldByName.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = fieldSlice.actions
export default fieldSlice.reducer
