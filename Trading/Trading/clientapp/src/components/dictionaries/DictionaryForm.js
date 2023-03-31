import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DictionaryFormActions from './DictionaryFormActions'
import DictionaryFormTitle from './DictionaryFormTitle'

export const DictionaryForm = ({ dataInputs, openDialog, title, onSubmit }) => {
  const { t } = useTranslation()
  const { register, handleSubmit } = useForm()

  return (
    <Dialog open={openDialog}>
      <DictionaryFormTitle title={title} />
      <DialogContent>
        <Stack spacing={3} onSubmit={handleSubmit(onSubmit)}>
          {(dataInputs !== undefined ? dataInputs : []).map((input) =>
            input.id === 'actions' || input.id === 'id' ? null : (
              <TextField
                key={input.id}
                {...register(input.id)}
                label={t(input.label)}
                variant="standard"
                margin="normal"
                fullWidth
              />
            )
          )}
        </Stack>
      </DialogContent>
      <DictionaryFormActions handleSubmit={handleSubmit(onSubmit)} />
    </Dialog>
  )
}

export default DictionaryForm
