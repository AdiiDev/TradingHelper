import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next'
import ReactHookFormSelect from '../common/ReactHookFormSelect';

// this should be stored in some kind of config file and based on number of columns different order of them
const intervalOptionsInit = [{ intervalTV: '1', label: '1 min', hide: true }, { intervalTV: '5', label: '5 min', hide: true }, { intervalTV: '10', label: '10 min', hide: true },
{ intervalTV: '15', label: '15 min', hide: false }, { intervalTV: '30', label: '30 min', hide: false },
{ intervalTV: '60', label: '1 h', hide: false }, { intervalTV: '120', label: '2 h', hide: false },
{ intervalTV: '240', label: '4 h', hide: false }, { intervalTV: 'D', label: 'D', hide: false },
{ intervalTV: 'W', label: 'Week', hide: false }]

const NewChartsDialog = ({ singleMode, onCancel, onConfirm, columns }) => {
  const { t } = useTranslation()
  const { handleSubmit, control } = useForm()
  const symbols = useSelector((state) => state.tradingPairs.tradingPairs)

  const [intervalColumns, setIntervalColumns] = useState(Array.from(Array(singleMode ? 1 : columns)))
  const [intervalOptions, setIntervalOptions] = useState(intervalOptionsInit.filter(x => !x.hide))

  const submit = (data) => {
    let intervalArray = []
    for (let i = 0; i < intervalColumns.length; i++)
      intervalArray.push(data['interval' + i])

    onConfirm({
      symbol: data.symbol,
      intervals: intervalArray
    })
  }

  const deleteIntervalColumn = () => {
    const newArray = Array.from(Array(intervalColumns.length - 1))
    setIntervalColumns(newArray)
  }

  return (
    <div>
      <Dialog open={true} fullWidth={true} maxWidth={'sm'}>
        <DialogTitle>{singleMode ? t('AddChart') : t('AddCharts')}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ paddingTop: 4 }}>
            <ReactHookFormSelect
              id="symbol"
              name="symbol"
              label={t('Symbol')}
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
                    label={t('Interval')}
                    control={control}
                    defaultValue={intervalOptions[index].intervalTV}
                    className={intervalColumns.length > 1 ? "Conditional-select" : ""}
                  >
                    {intervalOptions.map((inter) => <MenuItem key={'int' + inter.intervalTV} value={inter.intervalTV}>{inter.label}</MenuItem>)}
                  </ReactHookFormSelect>
                  {intervalColumns.length > 1 && <IconButton onClick={() => deleteIntervalColumn()}>
                    <DeleteIcon color='error' />
                  </IconButton>}
                </div>)
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onCancel()}>{t('Cancel')}</Button>
          <Button onClick={handleSubmit(submit)} variant="contained">{singleMode ? t('AddChart') : t('AddCharts')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewChartsDialog