import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loadTradingPairs: [],
}

export const TradingPairsSlice = createSlice({
  name: 'tradingPairs',
  initialState,
  reducers: {
    LoadTradingPairs: (state, action) => {
      state.loadTradingPairs = action.payload
    },
  },
})

export const { LoadTradingPairs } = TradingPairsSlice.actions

export default TradingPairsSlice.reducer
