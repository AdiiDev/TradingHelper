import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import AppConfigurationService from '../services/config/AppConfigurationService'
import BaseConfigurationForm from '../components/basic/BaseConfigurationForm'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export const AppConfigPage = () => {
  const { handleSubmit, register, control } = useForm()
  const { t } = useTranslation()

  const onSubmit = async (data) => {
    const obj = JSON.stringify({
      Username: data.username,
      Theme: data.theme,
      Language: data.language,
      ConnectionString: data.connectionString,
    })
    const res = await AppConfigurationService.UpdateConfig(obj)
    if (res.isError) {
      toast.error('Error updating config')
    } else {
      toast.success('Config updated. Application restart ')
    }
  }

  return (
    <Box sx={{ margin: 'auto', width: '40%' }}>
      <Typography variant="h3">{t('Configuration')}</Typography>
      <Paper className="App-config-paper">
        <BaseConfigurationForm
          focus={true}
          register={register}
          control={control}
        />
      </Paper>
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
    </Box>
  )
}
