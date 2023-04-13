import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tradingPairs: [],
}

export const TradingPairsSlice = createSlice({
  name: 'tradingPairs',
  initialState,
  reducers: {
    setTradingPairs: (state, action) => {
      state.tradingPairs = action.payload
    },
  },
})

export const { setTradingPairs } = TradingPairsSlice.actions

export default TradingPairsSlice.reducer
