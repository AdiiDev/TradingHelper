import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  intervals: []
}

export const IntervalsSlice = createSlice({
  name: 'intervals',
  initialState,
  reducers: {
    setIntervals: (state, action) => {
      state.intervals = action.payload

    },
  },
})

export const { setIntervals } =
  IntervalsSlice.actions

export default IntervalsSlice.reducer
