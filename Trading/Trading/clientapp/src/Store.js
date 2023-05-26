import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import configSlice from './services/config/ConfigSlice'
import brokerAccountSlice from './services/dictionary/BrokerAccountSlice'
import confirmationSlice from './services/dictionary/ConfirmationSlice'
import tradingPairsSlice from './services/dictionary/TradingPairsSlice'
import intervalsSlice from './services/dictionary/IntervalsSlice'
import layoutsConfigSlice from './services/config/LayoutsConfigSlice'

export const store = configureStore({
  reducer: {
    config: configSlice,
    brokerAccounts: brokerAccountSlice,
    confirmations: confirmationSlice,
    tradingPairs: tradingPairsSlice,
    intervals: intervalsSlice,
    layouts: layoutsConfigSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
