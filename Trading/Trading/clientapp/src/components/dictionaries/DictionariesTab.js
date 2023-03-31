import React, { useState } from 'react'
import { Tabs, Tab, Paper } from '@mui/material'
import DictionaryAccountTable from './DictionaryAccountTable'
import DictionaryConfirmationTable from './DictionaryConfirmationTable'
import DictionaryTradingPairTable from './DictionaryTradingPairTable'
import { useTranslation } from 'react-i18next'

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
        <Tab label={t('TradingPairs')} />
        <Tab label={t('Accounts')} />
        <Tab label={t('Confirmations')} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DictionaryTradingPairTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DictionaryAccountTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DictionaryConfirmationTable />
      </TabPanel>
    </div>
  )
}
export default DictionariesTab
