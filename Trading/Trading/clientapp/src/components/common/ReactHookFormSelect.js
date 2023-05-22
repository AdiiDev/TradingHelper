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
  className,
  required,
  ...props
}) => {
  const labelId = `${name}-label`
  return (
    <FormControl sx={{ width: '100%' }} className={className}>
      <InputLabel required={required} id={labelId} shrink={true}>
        {label}
      </InputLabel>
      <Controller
        key={labelId}
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Select
            labelId={labelId}
            notched={true}
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
