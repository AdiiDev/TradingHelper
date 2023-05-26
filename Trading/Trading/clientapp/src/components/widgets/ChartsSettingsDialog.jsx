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

const ChartsSettingsDialog = ({ close, baseSettings, handleBase, layoutHook, handleLayouts }) => {
  const { t } = useTranslation()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const save = (data) => {
    if (value === 0) {
      handleBase(data)
    }
    if (value === 1) {
      handleLayouts(data)
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
            <LayoutsForm hookForm={layoutHook} />
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