import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ReactHookFormSelect from '../common/ReactHookFormSelect';

const NewChartsDialog = ({ setOptions, singleMode, onCancel, onConfirm, columns }) => {
  const symbols = useSelector((state) => state.tradingPairs.tradingPairs)
  const { register, handleSubmit, control } = useForm()
  const intervalOptions = [{ intervalTV: '1', label: '1 min' }, { intervalTV: '5', label: '5 min' }, { intervalTV: '10', label: '10 min' },
  { intervalTV: '15', label: '15 min' }, { intervalTV: '30', label: '30 min' },
  { intervalTV: '60', label: '1 h' }, { intervalTV: '120', label: '2 h' },
  { intervalTV: '240', label: '4 h' }, { intervalTV: 'D', label: 'D' },
  { intervalTV: 'W', label: 'Week' }]
  const [intervalColumns, setIntervalColumns] = useState(Array.from(Array(columns)))
  const submit = (data) => {
    console.log('Data', data)
  }
  console.log('columns', columns)

  const deleteIntervalColumn = () => {
    const newArray = Array.from(Array(intervalColumns.length - 1))
    setIntervalColumns(newArray)
  }

  return (
    <div>
      <Dialog open={true} onClose={() => onCancel()}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ paddingTop: 4 }}>
            <ReactHookFormSelect
              id="symbol"
              name="symbol"
              label='Trading pair'
              control={control}
              defaultValue={symbols[0].symbol}
            >
              {symbols.map((symbol) => <MenuItem key={'symbol' + symbol.id} value={symbol.symbol}>{symbol.symbol}</MenuItem>)}
            </ReactHookFormSelect>
            {intervalColumns.map((col, index) => {
              return (
                <div key={"intervaldiv" + index}>
                  <ReactHookFormSelect
                    key={"interval" + index}
                    id={"interval" + index}
                    name={"interval" + index}
                    label='Interval'
                    control={control}
                    defaultValue={intervalOptions[0].intervalTV}
                    className={intervalColumns.length > 1 ? "Conditional-select" : ""}
                  >
                    {intervalOptions.map((inter) => <MenuItem key={'int' + inter.intervalTV} value={inter.intervalTV}>{inter.label}</MenuItem>)}
                  </ReactHookFormSelect>
                  {intervalColumns.length > 1 && <IconButton onClick={() => deleteIntervalColumn()}>
                    <DeleteIcon color='red' />
                  </IconButton>}
                </div>)
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onCancel()}>Cancel</Button>
          <Button onClick={handleSubmit(submit)} primary>Add charts</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewChartsDialog