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
      state.message = action.payload.message
      state.error = action.payload.error
    },
  },
})


export const {authInfo} = authSlice.actions

export default authSlice.reducer