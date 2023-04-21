import React from 'react'
import FormControl from '@mui/material/FormControl'
import Chip from '@mui/material/Chip'
import { Controller } from 'react-hook-form'
import { TextField, MenuItem, Checkbox, ListItemText } from '@mui/material'

const ReactHookFormMultiSelect = ({ control, name, label, options, optionsKeyProp, optionsValueProp, optionsLabelProp }) => {

  // Need to fix styles a litlle
  return (
    <FormControl sx={{ width: '100%' }}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          console.log(value);
          return (
            <TextField
              select
              id={name}
              variant="outlined"
              label={label}
              SelectProps={{
                multiple: true,
                value: value,
                renderValue: (selected) => {
                  return (<div>
                    {(selected).map(value => {
                      const option = options.find(el => el[optionsValueProp] === value)
                      if (option === 'undefined')
                        return null
                      return (<Chip key={value} label={option[optionsLabelProp]} />)
                    })}
                  </div>)
                },
                onChange: onChange
              }}
            >
              {options.map((option) => (
                <MenuItem key={option[optionsKeyProp]} value={option[optionsValueProp]}>
                  <Checkbox checked={value?.includes(option[optionsValueProp])} />
                  <ListItemText primary={option[optionsLabelProp]} />
                </MenuItem>
              ))}
            </TextField>
          );
        }}
      />
    </FormControl>
  )
}

export default ReactHookFormMultiSelect