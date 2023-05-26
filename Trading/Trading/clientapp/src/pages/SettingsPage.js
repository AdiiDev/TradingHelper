import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Collapse } from '@mui/material'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ReactHookFormSelect from '../components/common/ReactHookFormSelect'
import AppConfigurationService from '../services/config/AppConfigurationService'

const SettingsPage = () => {
  const { t } = useTranslation()
  const userData = useSelector((state) => state.config)
  const [expanded, setExpanded] = useState(false)

  const { handleSubmit, register, control } = useForm()

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const onSubmit = async (data) => {
    const config = JSON.stringify({
      username: data.username,
      Theme: data.theme,
      Language: data.language,
      connectionString:
        data.connectionString === ''
          ? userData.connectionString
          : data.connectionString,
    })
    const res = await AppConfigurationService.UpdateConfig(config)
    if (res.isError) {
      toast.error(t('ErrorUpdatingSettings'))
    } else {
      toast.success(t('UpdatedSettings'))
    }
  }

  return (
    <>
      <Typography variant="h3">{t('Settings')}</Typography>
      <Paper className="App-config-paper">
        <Stack spacing={3}>
          <TextField
            {...register('username')}
            label={t('Username')}
            fullWidth
            defaultValue={userData.username}
            autoFocus
          />
          <ReactHookFormSelect
            id="lang"
            name="language"
            label={t('Language')}
            control={control}
            defaultValue={userData.language}
          >
            <MenuItem value="pl">{t('Polish')}</MenuItem>
            <MenuItem value="en">{t('English')}</MenuItem>
          </ReactHookFormSelect>
          <ReactHookFormSelect
            id="theme"
            name="theme"
            label={t('Theme')}
            control={control}
            defaultValue={userData.theme}
          >
            <MenuItem value="light">{t('Light')}</MenuItem>
            <MenuItem value="dark">{t('Dark')}</MenuItem>
          </ReactHookFormSelect>
          <Button onClick={toggleExpanded}>
            {' '}
            {t('Advanced')} {expanded ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={expanded}>
            <TextField
              {...register('connectionString')}
              fullWidth
              label={t('ConnectionString')}
              className="Controller-text-field"
              defaultValue=""
            />{' '}
          </Collapse>
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            variant="contained"
            disableElevation
            onClick={handleSubmit(onSubmit)}
          >
            {t('Save')}
          </Button>
        </Box>
      </Paper>
    </>
  )
}

export default SettingsPage
