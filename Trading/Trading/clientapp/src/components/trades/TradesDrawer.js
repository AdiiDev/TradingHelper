import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { tradesDrawerColumns } from '../../data'
import TradesMultiSelectForm from './TradesMultiSelectForm'

const TradesDrawer = ({ filter, onSubmit, drawerOpen, setDrawerOpen }) => {
  const { t } = useTranslation()
  const tradingPairsData = useSelector(
    (state) => state.tradingPairs.tradingPairs
  )
  const confirmationsData = useSelector(
    (state) => state.confirmations.confirmations
  )

  const { register, handleSubmit, control, getValues, setValue } = useForm({
    defaultValues: filter !== null ? filter : null,
  })

  return (
    <>
      <Drawer
        anchor={'right'}
        open={drawerOpen}
        onClose={handleSubmit(onSubmit)}
      >
        <Typography className="drawer-Typography">{t('FilterData')}</Typography>
        <div className="drawer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} padding={'16px'}>
              {(tradesDrawerColumns !== undefined
                ? tradesDrawerColumns
                : []
              ).map((input) => {
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
                            <DesktopDatePicker
                              className="input"
                              label={t(input.label)}
                              value={value}
                              inputFormat="YYYY/MM/DD"
                              onChange={(e) => {
                                onChange(e)
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
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
          </form>
        </div>
      </Drawer>
    </>
  )
}

export default TradesDrawer
