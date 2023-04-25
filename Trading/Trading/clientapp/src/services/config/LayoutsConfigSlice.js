import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedLayout: null,
  layouts: []
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
      if (action.payload.layouts.length > 0)
        state.selectedLayout = action.payload.layouts[0]
    },
  },
})

export const { changeLayout, setLayouts } = layoutConfigSlice.actions

export default layoutConfigSlice.reducer
