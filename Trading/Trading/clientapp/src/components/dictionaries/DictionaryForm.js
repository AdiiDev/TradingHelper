import React, { useEffect, useState } from 'react'
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
  const { register, handleSubmit, reset, control, getValues, setValue } =
    useForm({
      defaultValues: editData !== null ? editData : null,
    })

  const [brokerNameValue, setBrokerNameValue] = useState('')
  const [accountNumberValue, setAccountNumberValue] = useState('')

  useEffect(() => {
    if (editData !== null) {
      reset(editData)
    }
  }, [openDialog])

  const handleBrokerNameChange = (event) => {
    const { value } = event.target
    setBrokerNameValue(value)
    const nameValue = `${value}-${accountNumberValue}`
    setValue('name', nameValue)
  }

  const handleAccountNumberChange = (event) => {
    const { value } = event.target
    setAccountNumberValue(value)
    const nameValue = `${brokerNameValue}-${value}`
    setValue('name', nameValue)
  }

  return (
    <Dialog open={openDialog}>
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
                      {...register(input.id)}
                      variant="standard"
                      margin="normal"
                      fullWidth
                      required
                      value={getValues(input.id)}
                      InputLabelProps={{
                        shrink: true,
                        focused: true,
                      }}
                      label={t(input.label)}
                    />
                  )
                } else if (input.id === 'brokerName') {
                  return (
                    <TextField
                      key={input.id}
                      {...register(input.id)}
                      label={t(input.label)}
                      variant="standard"
                      margin="normal"
                      fullWidth
                      required
                      value={brokerNameValue}
                      onChange={handleBrokerNameChange}
                    />
                  )
                } else if (input.id === 'accountNumber') {
                  return (
                    <TextField
                      key={input.id}
                      {...register(input.id)}
                      label={t(input.label)}
                      variant="standard"
                      margin="normal"
                      fullWidth
                      required
                      value={accountNumberValue}
                      onChange={handleAccountNumberChange}
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
