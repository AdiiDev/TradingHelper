import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DictionaryFormActions from './DictionaryFormActions'
import DictionaryFormTitle from './DictionaryFormTitle'
import ReactHookFormSwitchReusable from '../common/ReactHookFormSwitchReusable'

export const DictionaryForm = ({
  dataInputs,
  setOpenDialog,
  title,
  onSubmit,
  editData,
}) => {
  const { t } = useTranslation()
  const { register, handleSubmit, reset, control, watch, setValue } = useForm({
    defaultValues: editData !== null ? editData : null,
  })

  useEffect(() => {
    if (editData !== null) {
      reset(editData)
    }
  }, [])

  const brokerName = watch('brokerName')
  const accountNumber = watch('accountNumber')

  useEffect(() => {
    if (brokerName && accountNumber) {
      setValue('name', `${brokerName}-${accountNumber}`)
    }
  }, [brokerName, accountNumber])

  return (
    <Dialog open={true}>
      <DictionaryFormTitle title={title} setOpenDialog={setOpenDialog} />
      <DialogContent>
        <Stack spacing={3} onSubmit={handleSubmit(onSubmit)}>
          {(dataInputs !== undefined ? dataInputs : []).map((input) => {
            switch (input.type) {
              case 'text':
                if (input.id === 'name') {
                  return (
                    <TextField
                      key={input.id}
                      {...register('name')}
                      label={t('Name')}
                      variant="standard"
                      margin="normal"
                      fullWidth
                      required
                      defaultValue={name}
                      InputLabelProps={{ shrink: true }}
                    />
                  )
                } else {
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
                }
              case 'checkbox':
                return (
                  <ReactHookFormSwitchReusable
                    key={input.id}
                    control={control}
                    name={input.id}
                    label={t(input.label)}
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
