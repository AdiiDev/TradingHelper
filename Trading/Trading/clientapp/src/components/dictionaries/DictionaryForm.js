import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DictionaryFormActions from './DictionaryFormActions'
import DictionaryFormTitle from './DictionaryFormTitle'

export const DictionaryForm = ({
  dataInputs,
  openDialog,
  title,
  onSubmit,
  editData,
}) => {
  const { t } = useTranslation()
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: editData !== undefined ? { ...editData } : null,
  })

  return (
    <Dialog open={openDialog}>
      <DictionaryFormTitle title={title} />
      <DialogContent>
        <Stack spacing={3} onSubmit={handleSubmit(onSubmit)}>
          {(dataInputs !== undefined ? dataInputs : []).map((input) => {
            switch (input.type) {
              case 'text':
                return (
                  <TextField
                    key={input.id}
                    {...register(input.id)}
                    label={t(input.label)}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    required
                  />
                )
              case 'checkbox':
                return (
                  <FormControlLabel
                    key={input.id}
                    control={
                      <Switch
                        key={input.id}
                        {...register('favourite')}
                        defaultChecked={false}
                        onChange={(e) => {
                          setValue('favourite', e.target.checked)
                        }}
                        name="favourite"
                        value={true}
                        inputProps={{ 'aria-label': 'Favourite' }}
                      />
                    }
                    label={t('Favourite')}
                    labelPlacement="start"
                  />
                )
              case 'none':
                return null
              default:
                return null
            }
          })}
        </Stack>
      </DialogContent>
      <DictionaryFormActions handleSubmit={handleSubmit(onSubmit)} />
    </Dialog>
  )
}

export default DictionaryForm
