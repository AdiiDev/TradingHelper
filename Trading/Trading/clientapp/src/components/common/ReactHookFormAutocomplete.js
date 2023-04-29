import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem'

const ReactHookFormAutocomplete = ({ control, options, optionsValueProp, optionsLabelProp, name, label, defaultValue }) => {
  console.log('Default val', defaultValue)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          onChange={(event, item) => {
            console.log('OptionValueProp', optionsValueProp)
            console.log('E', event)
            if (item === null) {
              onChange("")
              return
            }
            if (optionsValueProp)
              onChange(item[optionsValueProp])
            else
              onChange(item);
          }}
          options={options}
          isOptionEqualToValue={(option, val) => option[optionsValueProp] === val}
          defaultValue={defaultValue ? defaultValue : ""}
          getOptionLabel={(item) => (item[optionsLabelProp] ? item[optionsLabelProp] : (item ? item : ""))}
          renderOption={(props, option) => <MenuItem {...props} key={'symbol' + option[optionsValueProp]} value={option[optionsValueProp]}>{option[optionsLabelProp]}</MenuItem>}
          renderInput={(params) => {
            console.log('Params', params)
            return (<TextField
              {...params}
              InputLabelProps={{ shrink: true }}
              label={label}
              margin="normal"
              variant="outlined"
              className='Pad-top-0'
            />)
          }
          }
        />
      )
      }
    />
  );
}


export default ReactHookFormAutocomplete