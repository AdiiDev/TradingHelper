import React from 'react'
import { useTranslation } from 'react-i18next'
import FormControl from '@mui/material/FormControl'
import Chip from '@mui/material/Chip'
import { Controller } from 'react-hook-form'
import { TextField, MenuItem, Checkbox, ListItemText } from '@mui/material'
/*
  How to use
 const options = [{ id: 1, label: 'Test1', val: 1 }, { id: 2, label: 'Test2', val: 2 }, { id: 3, label: 'Test3', val: 3 }, { id: 4, label: 'Test4', val: 4 },]

  <ReactHookFormMultiSelect control={control} name="selectedNumbers" label="Test multiselect" options={options} optionsKeyProp="id" optionsValueProp="val" optionsLabelProp="label" />
*/

const ReactHookFormMultiSelect = ({
  control,
  name,
  label,
  options,
  optionsKeyProp,
  optionsValueProp,
  optionsLabelProp,
  required,
}) => {
  const { t } = useTranslation()

  const onChangeOverride = (e, value) => {
    const selectedValues = value.map((option) => option[optionsValueProp])
  }

  return (
    <FormControl sx={{ width: '100%' }}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const handleChange = (e, selectedOption) => {
            const selectedIndex =
              value &&
              value.findIndex(
                (option) =>
                  option[optionsKeyProp] === selectedOption[optionsKeyProp]
              )
            const updatedValue = Array.isArray(value) ? [...value] : []

            if (selectedIndex > -1) {
              updatedValue.splice(selectedIndex, 1)
            } else {
              updatedValue.push(selectedOption)
            }

            onChangeOverride(e, updatedValue)
            onChange(updatedValue)
          }

          return (
            <TextField
              required={required}
              sx={{ paddingBottom: '20px !important' }}
              select
              id={name}
              variant="standard"
              label={label}
              SelectProps={{
                multiple: true,
                value: Array.isArray(value) ? value : [],
                renderValue: (selected) => {
                  return (
                    <div>
                      {selected.map((option) => {
                        const optionLabel =
                          option === options.day
                            ? options.label
                            : option[optionsLabelProp]
                        return <Chip key={optionLabel} label={t(optionLabel)} />
                      })}
                    </div>
                  )
                },
              }}
            >
              {options.map((option) => {
                const optionKey = option[optionsKeyProp]
                const isChecked = value?.some(
                  (selectedOption) =>
                    selectedOption[optionsKeyProp] === optionKey
                )

                return (
                  <MenuItem
                    key={optionKey}
                    value={option}
                    onClick={(e) => {
                      handleChange(e, option)
                    }}
                  >
                    <Checkbox checked={isChecked} />
                    <ListItemText primary={t(option[optionsLabelProp])} />
                  </MenuItem>
                )
              })}
            </TextField>
          )
        }}
      />
    </FormControl>
  )
}

export default ReactHookFormMultiSelect
