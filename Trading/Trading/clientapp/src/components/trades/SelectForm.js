import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

const SelectForm = ({ control, input, options, setValue }) => {
  const { t } = useTranslation()

  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value)
    setValue(input.id, event.target.value)
  }

  return (
    <FormControl key={input.id} fullWidth>
      <Controller
        control={control}
        name={input.id}
        render={({ field }) => (
          <TextField
            {...field}
            select
            value={selectedOption}
            onChange={handleOptionSelect}
            label={t(input.label)}
            variant="standard"
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option}>
                {option.symbol}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </FormControl>
  )
}

export default SelectForm
