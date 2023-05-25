import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { tradesDrawerColumns } from '../../data'
import ReactHookFormSwitchReusable from '../common/ReactHookFormSwitchReusable'
import DateAndTimePickerReusable from '../common/DateAndTimePickerReusable'
import ReactHookFormMultiSelect from '../common/ReactHookFormMultiSelect'

const TradesDrawer = ({ filter, onSubmit, setDrawerOpen }) => {
  const { t } = useTranslation()
  const tradingPairsData = useSelector(
    (state) => state.tradingPairs.tradingPairs
  )
  const confirmationsData = useSelector(
    (state) => state.confirmations.confirmations
  )

  const initialState = {
    brokerId: 0,
    tradingPairId: [],
    dateFrom: moment().startOf('year'),
    dateTime: moment(),
    tradeConsistentStrategy: false,
    numberOfConfirmations: null,
    confirmations: [],
    profit: null,
    loss: null,
    onlyProfit: false,
    onlyLoss: false,
  }

  const { register, handleSubmit, control } = useForm({
    defaultValues: filter !== null ? filter : initialState,
  })

  return (
    <Drawer anchor={'right'} open={true} onClose={handleSubmit(onSubmit)}>
      <Typography className="drawer-Typography">{t('FilterData')}</Typography>
      <Stack spacing={3} padding={'16px'} onSubmit={handleSubmit(onSubmit)}>
        {(tradesDrawerColumns !== undefined ? tradesDrawerColumns : []).map(
          (input) => {
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
              case 'multi-select1':
                return (
                  <ReactHookFormMultiSelect
                    key={input.id}
                    control={control}
                    name={input.id}
                    label={t(input.label)}
                    options={tradingPairsData}
                    optionsKeyProp={'id'}
                    optionsValueProp={'id'}
                    optionsLabelProp={'symbol'}
                  />
                )
              case 'multi-select2':
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
                  />
                )
              case 'time':
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
          }
        )}
        <Button
          variant="text"
          size="medium"
          startIcon={<ClearOutlinedIcon />}
          onClick={() => setDrawerOpen(false)}
          sx={{ color: 'gold' }}
        >
          {t('Cancel')}
        </Button>
      </Stack>
    </Drawer>
  )
}

export default TradesDrawer
