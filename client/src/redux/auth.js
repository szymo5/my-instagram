import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: false,
  error: false,
  isLoading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authInfo: (state, action) => {
      state.message = action.payload
      state.error = false
    },
    authError: (state, action) => {
      state.error = action.payload
    },
    clearState: (state, action) => {
      state.message = false
      state.error = false
    },
    loadingState: (state, action) => {
      state.isLoading = action.payload
    }
  },
})


export const {authInfo, authError, clearState, loadingState} = authSlice.actions

export default authSlice.reducer