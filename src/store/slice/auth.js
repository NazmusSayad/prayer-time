import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }) {
      state.isLoggedIn = true
      console.log(payload)
    },
    logout(state, { payload }) {
      state.isLoggedIn = false
      console.log(payload)
    },
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer
