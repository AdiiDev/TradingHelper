import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
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
  setOpenDialog,
  title,
  onSubmit,
  editData,
}) => {
  const { t } = useTranslation()
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: editData !== null ? editData : null,
  })

  useEffect(() => {
    if (editData !== null) {
      reset(editData)
    }
  }, [openDialog])

  return (
    <Dialog open={openDialog}>
      <DictionaryFormTitle title={title} setOpenDialog={setOpenDialog} />
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
                      <Controller
                        control={control}
                        name="favourite"
                        defaultValue={false}
                        render={({ field: { value, ...field } }) => {
                          return <Switch checked={value} {...field} />
                        }}
                      />
                    }
                    label={t('Favourite')}
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
      <DictionaryFormActions
        handleSubmit={handleSubmit(onSubmit)}
        setOpenDialog={setOpenDialog}
      />
    </Dialog>
  )
}

export default DictionaryForm
