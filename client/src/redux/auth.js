import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: false,
  error: false
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
    }
  },
})


export const {authInfo, authError, clearState} = authSlice.actions

export default authSlice.reducer