import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openDialog: false,
}

export const DictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    setOpenDialog: (state, action) => {
      state.openDialog = action.payload
    },
  },
})

export const { setOpenDialog } = DictionarySlice.actions

export default DictionarySlice.reducer
