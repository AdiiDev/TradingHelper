import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  env: 'PROD',
  connectionString: '',
  username: '',
  theme: 'dark',
  language: 'pl',
}

export const configSlice = createSlice({
  name: 'env',
  initialState,
  reducers: {
    changeEnv: (state, action) => {
      state.env = action.payload
    },
    setConfig: (state, action) => {
      state.connectionString = action.payload.connectionString
      state.username = action.payload.username
      state.theme = action.payload.theme
      state.language = action.payload.language
    },
  },
})

export const { changeEnv, setConfig } = configSlice.actions

export default configSlice.reducer
