import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loadConfirmations: [],
}

export const ConfirmationSlice = createSlice({
  name: 'confirmations',
  initialState,
  reducers: {
    LoadConfirmations: (state, action) => {
      state.loadConfirmations = action.payload
    },
  },
})

export const { LoadConfirmations } = ConfirmationSlice.actions

export default ConfirmationSlice.reducer
