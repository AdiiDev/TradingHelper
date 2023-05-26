import React from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import moment from 'moment'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import MenuItem from '@mui/material/MenuItem'
import TradesService from '../../services/TradesService'
import { tradesColumns } from '../../data'
import DictionaryFormTitle from '../dictionaries/DictionaryFormTitle'
import DictionaryFormActions from '../dictionaries/DictionaryFormActions'
import DateAndTimePickerReusable from '../common/DateAndTimePickerReusable'
import ReactHookFormMultiSelect from '../common/ReactHookFormMultiSelect'
import ReactHookFormSelect from '../common/ReactHookFormSelect'
import ReactHookFormSwitchReusable from '../common/ReactHookFormSwitchReusable'
import DateAndTimePickerWithValidateReusable from '../common/DateAndTimePickerWithValidateReusable'

const TradesForm = ({ setOpenDialog, editData, onReload }) => {
  const { t } = useTranslation()
  const tradingPairsData = useSelector(
    (state) => state.tradingPairs.tradingPairs
  )
  const confirmationsData = useSelector(
    (state) => state.confirmations.confirmations
  )
  const brokerSelectedAccount = useSelector(
    (state) => state.brokerAccounts.selectedBroker
  )

  const initTradeState = {
    id: 0,
    brokerAccountId: brokerSelectedAccount.id,
    tradingPairId: null,
    tradeConsistentStrategy: false,
    startTrade: moment(),
    endTrade: null,
    profitLoss: null,
    note: '',
    confirmations: [],
  }

  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: editData !== null ? editData : initTradeState,
  })

  const onSubmit = async (data) => {
    const confirmationsArray = data.confirmations.map(
      (confirmation) => confirmation.id
    )
    console.log(data)
    const tradesData = JSON.stringify({
      id: data.id,
      brokerAccountId: brokerSelectedAccount.id,
      tradingPairId: data.tradingPairs !== null ? data.tradingPairs : null,
      tradeConsistentStrategy: data.tradeConsistentStrategy,
      startTrade: data.startTrade,
      endTrade: data.endTrade,
      profitLoss: data.profitLoss,
      note: data.note,
      confirmations: confirmationsArray,
    })
    console.log(tradesData)
    const res = await TradesService.AddTrades(tradesData)
    if (res.isError) {
      toast.error(t('ErrorUpdate'))
      return
    }
    toast.success(t('Added'))
    onReload()
    setOpenDialog(false)
  }

  return (
    <Dialog open={true}>
      <DictionaryFormTitle title={t('Trades')} setOpenDialog={setOpenDialog} />
      <DialogContent>
        <Stack
          spacing={3}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ paddingTop: '10px' }}
        >
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
                    required={false}
                    type="number"
                    placeholder={t('WriteNumber')}
                  />
                )
              case 'checkbox':
                return (
                  <ReactHookFormSwitchReusable
                    key={input.id}
                    control={control}
                    name={input.id}
                    label={t(input.label)}
                  />
                )
              case 'select':
                return (
                  <ReactHookFormSelect
                    key={input.id}
                    name={input.id}
                    label={t(input.label)}
                    control={control}
                    defaultValue={tradingPairsData[0].id}
                    required={true}
                  >
                    {tradingPairsData.map((option) => (
                      <MenuItem
                        key={`${input.id}-${option.id}`}
                        value={option.id}
                      >
                        {option.symbol}
                      </MenuItem>
                    ))}
                  </ReactHookFormSelect>
                )
              case 'multi-select':
                return (
                  <ReactHookFormMultiSelect
                    key={input.id}
                    control={control}
                    name={input.id}
                    label={t(input.label)}
                    options={confirmationsData}
                    optionsKeyProp={'id'}
                    optionsValueProp={'id'}
                    optionsLabelProp={'name'}
                    required={true}
                  />
                )
              case 'time1':
                return (
                  <DateAndTimePickerReusable
                    key={input.id}
                    control={control}
                    name={input.id}
                    label={t(input.label)}
                    required={true}
                  />
                )
              case 'time2':
                return (
                  <DateAndTimePickerWithValidateReusable
                    key={input.id}
                    control={control}
                    name={input.id}
                    label={t(input.label)}
                    required={false}
                    startDateAndTime={getValues('startTrade')}
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

export default TradesForm
