import React from 'react'
import FormControl from '@mui/material/FormControl'
import Chip from '@mui/material/Chip'
import { Controller } from 'react-hook-form'
import { TextField, MenuItem, Checkbox, ListItemText } from '@mui/material'
/*
  How to use
 const options = [{ id: 1, label: 'Test1', val: 1 }, { id: 2, label: 'Test2', val: 2 }, { id: 3, label: 'Test3', val: 3 }, { id: 4, label: 'Test4', val: 4 },]

  <ReactHookFormMultiSelect control={control} name="selectedNumbers" label="Test multiselect" options={options} optionsKeyProp="id" optionsValueProp="val" optionsLabelProp="label" />
*/


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