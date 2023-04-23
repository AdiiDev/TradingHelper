import React from 'react'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'


export const WidgetsBaseSettingsForm = ({ hookForm }) => {
  const { t } = useTranslation()

  return (
    <Stack spacing={3}>
      <TextField
        type="number"
        variant="standard"
        fullWidth
        required
        label={t('NumberOfColumns')}
        {...hookForm.register('columns')}
        error={Boolean(hookForm.formState.errors.columns)}
        helperText={hookForm.formState.errors.columns && t(hookForm.formState.errors.columns.message)}
      />
      <TextField
        type="number"
        variant="standard"
        fullWidth
        required
        label={t('NumberOfRows')}
        {...hookForm.register('rows')}
        error={Boolean(hookForm.formState.errors.rows)}
        helperText={hookForm.formState.errors.rows && t(hookForm.formState.errors.rows.message)}
      />
      <TextField
        type="number"
        variant="standard"
        fullWidth
        label={t('HeightOfElements')}
        {...hookForm.register('height')}
        error={Boolean(hookForm.formState.errors.height)}
        helperText={hookForm.formState.errors.height?.message}
      />
    </Stack>
  )
}

export default WidgetsBaseSettingsForm
