import React from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from '@mui/material/Dialog'
import { DialogContent } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import DialogHeader from '../common/DialogHeader'
import DialogActionsButtons from '../common/DialogActionsButtons'
import { TabPanel, a11yProps } from '../common/TabPanel'
import WidgetsBaseSettingsForm from './form/WidgetsBaseSettingsForm'
import LayoutsForm from './form/LayoutsForm';

const layouts = [
  {
    id: 1, name: 'Test', rows: 2, columns: 3, height: 250, grid: [
      { row: 0, column: 0, symbol: "BINANCE:BTCUSDT", interval: '15' },
      { row: 0, column: 1, symbol: "BINANCE:BTCUSDT", interval: '30' },
      { row: 0, column: 2, symbol: "BINANCE:BTCUSDT", interval: '60' },
      { row: 1, column: 0, symbol: "BINANCE:BNBUSDT", interval: '15' },
      { row: 1, column: 1, symbol: "BINANCE:BNBUSDT", interval: '30' },
      { row: 1, column: 2, symbol: "BINANCE:BNBUSDT", interval: '60' },

    ]
  },
  {
    id: 2, name: 'Test2', rows: 2, columns: 3, height: 250, grid: [
      { row: 0, column: 0, symbol: "BINANCE:BNBUSDT", interval: '15' },
      { row: 0, column: 1, symbol: "BINANCE:BNBUSDT", interval: '30' },
      { row: 0, column: 2, symbol: "BINANCE:BNBUSDT", interval: '60' },
    ]
  }
]

const ChartsSettingsDialog = ({ close, baseSettings, handleBase, layoutsSettings, layoutHook }) => {
  const { t } = useTranslation()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const save = (data) => {
    debugger
    if (value === 0) {
      handleBase(data)
    }
  }

  return (
    <Dialog open={true} maxWidth='xl' fullWidth>
      <DialogHeader title={t('View')} closeDialog={() => close()} />
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Current" {...a11yProps(0)} />
              <Tab label="Layouts" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Stack spacing={3}>
              <WidgetsBaseSettingsForm hookForm={baseSettings} />
            </Stack>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LayoutsForm layouts={layouts} hookForm={layoutHook} />
          </TabPanel>
        </Box>
      </DialogContent>
      <DialogActionsButtons close={() => close()}
        handleSubmit={value === 0 ? baseSettings.handleSubmit : layoutHook.handleSubmit}
        onSubmit={(data) => save(data)} />
    </Dialog>
  )
}

export default ChartsSettingsDialog