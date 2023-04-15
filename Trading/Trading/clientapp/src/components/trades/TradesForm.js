import React from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDateTimePicker } from '@mui/x-date-pickers'

import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DictionaryFormTitle from '../dictionaries/DictionaryFormTitle'
import DictionaryFormActions from '../dictionaries/DictionaryFormActions'
import { tradesColumns } from '../../data'
import TradesMultiSelectForm from './TradesMultiSelectForm'
import SelectForm from './SelectForm'

const TradesForm = ({ openDialog, setOpenDialog, editData, onSubmit }) => {
  const { t } = useTranslation()
  const tradingPairsData = useSelector(
    (state) => state.tradingPairs.tradingPairs
  )
  const confirmationsData = useSelector(
    (state) => state.confirmations.confirmations
  )
  const { register, handleSubmit, reset, control, getValues, setValue } =
    useForm({
      defaultValues: editData !== null ? editData : null,
    })

  return (
    <Dialog open={openDialog}>
      <DictionaryFormTitle title={t('Trades')} setOpenDialog={setOpenDialog} />
      <DialogContent>
        <Stack spacing={3} onSubmit={handleSubmit(onSubmit)}>
          {(tradesColumns !== undefined ? tradesColumns : []).map((input) => {
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
                    type="text"
                  />
                )
              case 'number':
                return (
                  <TextField
                    key={input.id}
                    {...register(input.id)}
                    label={t(input.label)}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    required
                    type="number"
                    placeholder={t('WriteNumber')}
                  />
                )
              case 'checkbox':
                return (
                  <FormControlLabel
                    key={input.id}
                    control={
                      <Controller
                        control={control}
                        name={input.id}
                        defaultValue={false}
                        render={({ field: { value, ...field } }) => {
                          return <Switch checked={value} {...field} />
                        }}
                      />
                    }
                    label={t(input.label)}
                  />
                )
              case 'select':
                return (
                  <SelectForm
                    key={input.id}
                    control={control}
                    input={input}
                    setValue={setValue}
                    options={tradingPairsData}
                  />
                )
              case 'multi-select':
                return (
                  <TradesMultiSelectForm
                    key={input.id}
                    control={control}
                    tradingPairs={tradingPairsData}
                    confirmations={confirmationsData}
                    input={input}
                    setValue={setValue}
                    getValues={getValues}
                  />
                )
              case 'time':
                return (
                  <LocalizationProvider
                    key={input.id}
                    dateAdapter={AdapterMoment}
                  >
                    <Controller
                      control={control}
                      name={input.id}
                      render={({ field: { onChange, value } }) => (
                        <DesktopDateTimePicker
                          className="input"
                          label={t(input.label)}
                          value={value}
                          inputFormat="yyyy/MM/DD HH:mm:ss"
                          onChange={(e) => {
                            onChange(e)
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      )}
                    />
                  </LocalizationProvider>
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

export default TradesForm
