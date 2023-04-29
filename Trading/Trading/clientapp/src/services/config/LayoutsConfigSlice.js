import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedLayout: null,
  layouts: [],
  showLayoutsSelect: false
}

export const layoutConfigSlice = createSlice({
  name: 'layouts',
  initialState,
  reducers: {
    changeLayout: (state, action) => {
      state.selectedLayout = action.payload
    },
    setLayouts: (state, action) => {
      state.layouts = action.payload.layouts
    },
    setShowLayout: (state, action) => {
      state.showLayoutsSelect = action.payload
    }
  },
})

export const { changeLayout, setLayouts, setShowLayout } = layoutConfigSlice.actions

export default layoutConfigSlice.reducer
