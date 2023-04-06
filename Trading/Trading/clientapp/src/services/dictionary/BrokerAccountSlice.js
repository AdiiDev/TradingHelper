import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loadBrokerAccount: [],
  selectedBroker: {
    id: 1,
    brokerAccount: '',
    accountNumber: '',
    name: '',
    favourite: true,
  },
}

export const BrokerAccountSlice = createSlice({
  name: 'brokerAccounts',
  initialState,
  reducers: {
    LoadBrokerAccount: (state, action) => {
      state.loadBrokerAccount = action.payload
      if (action.payload.length > 0) state.selectedBroker = action.payload[0]
    },
  },
})

export const { LoadBrokerAccount } = BrokerAccountSlice.actions

export default BrokerAccountSlice.reducer
