import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'

const TradesMultiSelectForm = ({
  control,
  input,
  tradingPairs,
  confirmations,
  setValue,
}) => {
  const { t } = useTranslation()
  const [selectedOptions, setSelectedOptions] = useState([])

  let options = []
  switch (input.id) {
    case 'tradingPairs':
      options = tradingPairs
      break
    case 'confirmations':
      options = confirmations
      break
    default:
      break
  }

  const sortedOptions = [...options].sort((a, b) => {
    const isSelectedA = selectedOptions.some((option) => option.id === a.id)
    const isSelectedB = selectedOptions.some((option) => option.id === b.id)
    if (isSelectedA && !isSelectedB) {
      return -1
    } else if (!isSelectedA && isSelectedB) {
      return 1
    } else {
      return 0
    }
  })

  return (
    <FormControl key={input.id} fullWidth>
      <Controller
        control={control}
        name={input.id}
        render={({ field }) => (
          <TextField
            {...field}
            variant="standard"
            select
            label={t(input.label)} // zmień na label
            value={selectedOptions}
            onChange={(event) => {
              setSelectedOptions(event.target.value)
              setValue(input.id, event.target.value)
            }}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => (
                <div>
                  {selected.map((option) => (
                    <Chip
                      key={option.id}
                      label={
                        option.name !== undefined ? option.name : option.symbol
                      }
                    />
                  ))}
                </div>
              ),
            }}
          >
            {sortedOptions.map((option) => (
              <MenuItem key={option.id} value={option}>
                <Checkbox
                  checked={selectedOptions.some(
                    (selectedOption) => selectedOption.id === option.id
                  )}
                />
                <ListItemText
                  primary={
                    input.id === 'tradingPairs' ? option.symbol : option.name
                  }
                />
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </FormControl>
  )
}

export default TradesMultiSelectForm
