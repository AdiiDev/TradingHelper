import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import { Controller } from 'react-hook-form'

// TODO: Add possible validation support
const ReactHookFormSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}) => {
  const labelId = `${name}-label`
  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Select
            labelId={labelId}
            label={label}
            id={labelId + 'select'}
            value={value}
            fullWidth
            onChange={onChange}
          >
            {children}
          </Select>
        )}
      />
    </FormControl>
  )
}
export default ReactHookFormSelect
