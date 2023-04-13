import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  confirmations: [],
}

export const ConfirmationSlice = createSlice({
  name: 'confirmations',
  initialState,
  reducers: {
    setConfirmations: (state, action) => {
      state.confirmations = action.payload
    },
  },
})

export const { setConfirmations } = ConfirmationSlice.actions

export default ConfirmationSlice.reducer
