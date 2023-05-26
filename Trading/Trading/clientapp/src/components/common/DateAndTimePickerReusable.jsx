import React from 'react'
import { Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDateTimePicker } from '@mui/x-date-pickers'
import TextField from '@mui/material/TextField'

const DateAndTimePickerReusable = ({ control, name, label, required }) => {
  return (
    <LocalizationProvider key={name} dateAdapter={AdapterMoment}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
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
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default DateAndTimePickerReusable
