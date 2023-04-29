import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs, Tab, Paper } from '@mui/material'
import DictionaryAccountTable from './DictionaryAccountTable'
import DictionaryConfirmationTable from './DictionaryConfirmationTable'
import DictionaryTradingPairTable from './DictionaryTradingPairTable'
import DictionaryIntervalsTable from './DictionaryIntervalsTable'

const TabPanel = (props) => {
  const { children, value, index } = props

  return (
    <div hidden={value !== index}>
      {value === index && (
        <Paper>
          <div>{children}</div>
        </Paper>
      )}
    </div>
  )
}

const DictionariesTab = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          sx={{
            fontWeight: 'bolder',
            fontSize: '1rem',
          }}
          label={t('Accounts')}
        />
        <Tab
          sx={{
            fontWeight: 'bolder',
            fontSize: '1rem',
          }}
          label={t('TradingPairs')}
        />
        <Tab
          sx={{
            fontWeight: 'bolder',
            fontSize: '1rem',
          }}
          label={t('Confirmations')}
        />
        <Tab
          sx={{
            fontWeight: 'bolder',
            fontSize: '1rem',
          }}
          label={t('Intervals')}
        />
      </Tabs>
      <TabPanel value={value} index={1}>
        <DictionaryTradingPairTable />
      </TabPanel>
      <TabPanel value={value} index={0}>
        <DictionaryAccountTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DictionaryConfirmationTable />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DictionaryIntervalsTable />
      </TabPanel>
    </div>
  )
}
export default DictionariesTab
