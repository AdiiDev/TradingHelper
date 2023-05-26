import React from 'react'
import { Controller } from 'react-hook-form'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

const ReactHookFormSwitchReusable = ({ name, label, control }) => {
  return (
    <FormControlLabel
      key={name}
      control={
        <Controller
          defaultValue={false}
          control={control}
          name={name}
          render={({ field: { value, ...field } }) => {
            return <Switch checked={value} {...field} />
          }}
        />
      }
      label={label}
    />
  )
}

export default ReactHookFormSwitchReusable
