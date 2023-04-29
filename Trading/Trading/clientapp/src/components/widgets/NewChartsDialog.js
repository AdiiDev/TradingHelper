import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import NewChartForm from './form/NewChartForm';

const NewChartsDialog = ({ singleMode, onCancel, onConfirm, columns }) => {
  const { t } = useTranslation()
  const { handleSubmit, control } = useForm()
  const symbols = useSelector((state) => state.tradingPairs.tradingPairs)
  const intervalOptionsInit = useSelector((state) => state.intervals.intervals)
  const [intervalColumns, setIntervalColumns] = useState(Array.from(Array(singleMode ? 1 : columns)))
  const [intervalOptions, setIntervalOptions] = useState(intervalOptionsInit.filter(x => !x.hide))

  const submit = (data) => {
    let intervalArray = []

    if (intervalColumns.length === 1)
      intervalArray.push(data.interval)
    else {
      for (let i = 0; i < intervalColumns.length; i++)
        intervalArray.push(data['interval' + i])
    }

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
          <NewChartForm defaultValue={symbols[0].symbol}
            symbolSelectName="symbol"
            intervalSelectName="interval"
            symbols={symbols} control={control}
            intervalColumns={intervalColumns} intervalOptions={intervalOptions}
            deleteIntervalColumn={() => deleteIntervalColumn()} />
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