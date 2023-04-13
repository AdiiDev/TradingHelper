import React from 'react'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import DialogContent from '@mui/material/DialogContent'

const WidgetsFormContent = ({ register, errors }) => {
  const { t } = useTranslation()

  return (
    <DialogContent>
      <Stack spacing={3}>
        <TextField
          type="number"
          variant="standard"
          fullWidth
          required
          label={t('NumberOfColumns')}
          {...register('columns')}
          error={Boolean(errors.columns)}
          helperText={errors.columns && t(errors.columns.message)}
        />
        <TextField
          type="number"
          variant="standard"
          fullWidth
          required
          label={t('NumberOfRows')}
          {...register('rows')}
          error={Boolean(errors.rows)}
          helperText={errors.rows && t(errors.rows.message)}
        />
        <TextField
          type="number"
          variant="standard"
          fullWidth
          label={t('HeightOfElements')}
          {...register('height')}
          error={Boolean(errors.height)}
          helperText={errors.height?.message}
        />
      </Stack>
    </DialogContent>
  )
}

export default WidgetsFormContent
