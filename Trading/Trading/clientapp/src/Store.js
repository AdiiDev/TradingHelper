import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import configSlice from './services/config/ConfigSlice'
import DictionarySlice from './services/dictionary/DictionarySlice'
import BrokerAccountSlice from './services/dictionary/BrokerAccountSlice'
import ConfirmationSlice from './services/dictionary/ConfirmationSlice'
import TradingPairsSlice from './services/dictionary/TradingPairsSlice'

export const store = configureStore({
  reducer: {
    config: configSlice,
    dict: DictionarySlice,
    brokerAccounts: BrokerAccountSlice,
    confirmations: ConfirmationSlice,
    tradingPairs: TradingPairsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
