import React from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from '@mui/material/Dialog'
import { DialogContent } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DialogHeader from '../common/DialogHeader'
import DialogActionsButtons from '../common/DialogActionsButtons'
import { TabPanel, a11yProps } from '../common/TabPanel'
import WidgetsBaseSettingsForm from './form/WidgetsBaseSettingsForm'

const ChartsSettingsDialog = ({ close, baseSettings, handleBase }) => {
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
    <Dialog open={true} maxWidth='md' fullWidth>
      <DialogHeader title={t('View')} closeDialog={() => close()} />
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Base" {...a11yProps(0)} />
              <Tab label="Advanced" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <WidgetsBaseSettingsForm hookForm={baseSettings} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
        </Box>
      </DialogContent>
      <DialogActionsButtons close={() => close()} handleSubmit={baseSettings.handleSubmit} onSubmit={(data) => save(data)} />
    </Dialog>
  )
}

export default ChartsSettingsDialog