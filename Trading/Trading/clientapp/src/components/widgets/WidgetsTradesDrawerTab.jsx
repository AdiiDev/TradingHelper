import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TabPanel } from '../common/TabPanel'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import WidgetsClosedTradesDrawerList from './WidgetsClosedTradesDrawerList'
import WidgetsOpenTradesDrawerList from './WidgetsOpenTradesDrawerList'

const WidgetsTradesDrawerTab = ({
  openTrades,
  closedTrades,
  setOpenTradeForm,
  setTradeData,
}) => {
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
          label={t('Open')}
        />
        <Tab
          sx={{
            fontWeight: 'bolder',
            fontSize: '1rem',
          }}
          label={t('Closed')}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <WidgetsOpenTradesDrawerList
          trades={openTrades}
          setOpenTradeForm={setOpenTradeForm}
          setTradeData={setTradeData}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WidgetsClosedTradesDrawerList
          trades={closedTrades}
          setOpenTradeForm={setOpenTradeForm}
          setTradeData={setTradeData}
        />
      </TabPanel>
    </div>
  )
}

export default WidgetsTradesDrawerTab
