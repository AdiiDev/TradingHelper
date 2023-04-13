import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import configSlice from './services/config/ConfigSlice'
import brokerAccountSlice from './services/dictionary/BrokerAccountSlice'
import confirmationSlice from './services/dictionary/ConfirmationSlice'
import tradingPairsSlice from './services/dictionary/TradingPairsSlice'

export const store = configureStore({
  reducer: {
    config: configSlice,
    brokerAccounts: brokerAccountSlice,
    confirmations: confirmationSlice,
    tradingPairs: tradingPairsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
