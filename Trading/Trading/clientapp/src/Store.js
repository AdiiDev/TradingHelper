import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import configSlice from './services/ConfigSlice'
import DictionarySlice from './services/DictionarySlice'

export const store = configureStore({
  reducer: {
    config: configSlice,
    dict: DictionarySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
