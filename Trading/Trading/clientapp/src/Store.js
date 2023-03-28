import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterReducer from './services/CounterSlice'
import configSlice from './services/ConfigSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    config: configSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
