import React from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import ReactHookFormSelect from '../../common/ReactHookFormSelect'

const NewChartForm = ({ defaultValue, symbolSelectName, intervalSelectName, symbols, intervalColumns, intervalOptions, deleteIntervalColumn, control }) => {
  const { t } = useTranslation()

  return (
    <Stack spacing={3} sx={{ paddingTop: 4 }}>
      <ReactHookFormSelect
        id="symbol"
        name={symbolSelectName}
        label={t('Symbol')}
        control={control}
        defaultValue={defaultValue}
      >
        {symbols.map((symbol) => <MenuItem key={'symbol' + symbol.id} value={symbol.symbol}>{symbol.symbol}</MenuItem>)}
      </ReactHookFormSelect>
      {intervalColumns.map((col, index) => {
        return (
          <div key={"intervaldiv" + index}>
            <ReactHookFormSelect
              key={intervalSelectName + index}
              id={intervalSelectName + index}
              name={intervalSelectName + (intervalColumns.length > 1 ? index : "")}
              label={t('Interval')}
              control={control}
              defaultValue={intervalOptions[index].interval}
              className={intervalColumns.length > 1 ? "Conditional-select" : ""}
            >
              {intervalOptions.map((inter) => <MenuItem key={'int' + inter.interval} value={inter.interval}>{inter.label}</MenuItem>)}
            </ReactHookFormSelect>
            {intervalColumns.length > 1 && <IconButton onClick={() => deleteIntervalColumn()}>
              <DeleteIcon color='error' />
            </IconButton>}
          </div>)
      })}
    </Stack>
  )
}

export default NewChartForm