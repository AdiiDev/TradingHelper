import React from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDateTimePicker } from '@mui/x-date-pickers'
import TextField from '@mui/material/TextField'

const DateAndTimePickerWithValidateReusable = ({
  control,
  label,
  name,
  required,
  startDateAndTime,
}) => {
  const { t } = useTranslation()
  return (
    <LocalizationProvider key={name} dateAdapter={AdapterMoment}>
      <Controller
        control={control}
        name={name}
        rules={{
          validate: (value) => {
            const startDateTimeValid = startDateAndTime
            if (startDateTimeValid && value) {
              const startMoment = moment(
                startDateTimeValid,
                'yyyy/MM/DD HH:mm:ss'
              )
              const endMoment = moment(value, 'yyyy/MM/DD HH:mm:ss')
              if (endMoment.isBefore(startMoment)) {
                return 'EndDateAndTimeMustBeAfterStartDateAndTime'
              }
            }
            return true
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DesktopDateTimePicker
            className="input"
            label={label}
            value={value}
            inputFormat="yyyy/MM/DD HH:mm:ss"
            onChange={(e) => {
              onChange(e)
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  '& .MuiFormLabel-root': {
                    left: '3px',
                    top: '-5px',
                  },
                }}
                required={required}
                {...params}
                error={Boolean(error)}
                helperText={t(error?.message)}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default DateAndTimePickerWithValidateReusable
