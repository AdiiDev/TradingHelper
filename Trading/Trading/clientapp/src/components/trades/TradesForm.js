import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import moment from 'moment'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import MenuItem from '@mui/material/MenuItem'
import { tradesColumns } from '../../data'
import DictionaryFormTitle from '../dictionaries/DictionaryFormTitle'
import DictionaryFormActions from '../dictionaries/DictionaryFormActions'
import DateAndTimePickerReusable from '../common/DateAndTimePickerReusable'
import ReactHookFormMultiSelect from '../common/ReactHookFormMultiSelect'
import ReactHookFormSelect from '../common/ReactHookFormSelect'
import ReactHookFormSwitchReusable from '../common/ReactHookFormSwitchReusable'

const TradesForm = ({ setOpenDialog, editData, onSubmit }) => {
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

  const { register, handleSubmit, control } = useForm({
    defaultValues: editData !== null ? editData : initTradeState,
  })

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
                  <DateAndTimePickerReusable
                    key={input.id}
                    control={control}
                    name={input.id}
                    label={t(input.label)}
                    required={false}
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
