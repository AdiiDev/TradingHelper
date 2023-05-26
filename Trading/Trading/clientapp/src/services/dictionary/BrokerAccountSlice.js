import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  brokerAccounts: [],
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
    setBrokerAccounts: (state, action) => {
      state.brokerAccounts = action.payload
      if (action.payload.length > 0) state.selectedBroker = action.payload[0]
    },
    setSelectedBroker: (state, action) => {
      state.selectedBroker = action.payload
    },
  },
})

export const { setBrokerAccounts, setSelectedBroker } =
  BrokerAccountSlice.actions

export default BrokerAccountSlice.reducer
