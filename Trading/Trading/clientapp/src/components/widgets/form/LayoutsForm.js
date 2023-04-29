import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import { useFieldArray } from 'react-hook-form'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import ReactHookFormSelect from '../../common/ReactHookFormSelect'
import WidgetsBaseSettingsForm from './WidgetsBaseSettingsForm'
import NewChartForm from './NewChartForm'
import { TextField } from '@mui/material'

const LayoutsForm = ({ hookForm }) => {
  const { t } = useTranslation();
  const symbols = useSelector((state) => state.tradingPairs.tradingPairs)
  const layouts = useSelector((state) => state.layouts.layouts)
  const intervalOptionsInit = useSelector((state) => state.intervals.intervals)
  const [addMode, setAddMode] = useState(false)

  const watchRows = hookForm.watch("rows") // after , you can provide default value
  const watchColumns = hookForm.watch("columns")
  const watchName = hookForm.watch("name")
  const { fields, replace } = useFieldArray({
    control: hookForm.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "grid", // unique name for your Field Array
  });

  useEffect(() => {
    console.log('layouts', layouts)
    if (layouts.length > 0)
      hookForm.reset(layouts[0])
    else {
      const baseLayout = {
        id: 0,
        name: '',
        rows: 1,
        columns: 1,
        height: 250,
        grid: [
          { row: 0, column: 0, symbol: symbols[0].symbol, interval: '15' },
        ]
      }
      hookForm.reset(baseLayout)
      setAddMode(true)
    }
  }, [layouts])

  useEffect(() => {
    const rows = hookForm.getValues("rows")
    const columns = hookForm.getValues("columns")
    const grid = hookForm.getValues("grid")
    setWatchedError(rows, 'rows', 'Err rows')
    setWatchedError(columns, 'columns', 'Err columns')

    // Logic for insert or remove
    adjustGrid(rows, columns, grid)
  }, [watchRows, watchColumns])

  useEffect(() => {
    const name = hookForm.getValues("name")
    console.log('Id', name)
    const layout = layouts.find(x => x.name === name)
    console.log('Found layout', layout)
    hookForm.reset(layout)
  }, [watchName])

  const adjustGrid = (rows, columns, grid) => {
    // Temp fix
    if (grid.length === 0)
      return
    const columnsLength = grid.filter(x => x.row === 0).length
    const rowsLength = grid.length / columnsLength

    if (rows !== rowsLength) {
      if (rows > rowsLength) {
        const diff = rows - rowsLength
        const firstElement = grid[0]
        for (let i = 0; i < diff; i++) {
          for (let j = 0; j < columns; j++) {
            grid.push({ row: rowsLength + i, column: j, symbol: firstElement.symbol, interval: firstElement.interval })
          }
        }
      }
      else {
        const diff = rowsLength - rows
        for (let i = 0; i < diff; i++) {
          for (let j = 0; j < columns; j++)
            grid.pop()
        }
      }
      replace(grid)
    }
    if (columns !== columnsLength) {
      if (columns > columnsLength) {
        const firstElement = grid[0]

        for (let i = 0; i < rowsLength; i++) {
          for (let j = columnsLength; j < columns; j++)
            grid.push({ row: i, column: j, symbol: firstElement.symbol, interval: firstElement.interval })
        }
        grid.sort((a, b) => a.row === b.row || b.column - a.column);
      }
      else {
        grid = removeItemAll(grid, columns)
      }

      replace(grid)
    }
  }

  const removeItemAll = (arr, value) => {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].column >= value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }


  const setWatchedError = (value, name, errLabel) => {
    if (value) {
      if (value > 12) {
        hookForm.setError(name, { type: "focus", message: errLabel })
      }
    }
  }

  const addModeChange = () => {
    if (addMode) {
      const layoutSelected = hookForm.getValues("id")
      const lay = layouts.find(x => x.id === layoutSelected)
      hookForm.reset(lay)
      setAddMode(false)
    }
    else {
      setAddMode(true)
      const baseLayout = {
        id: 0,
        name: '',
        rows: 1,
        columns: 1,
        height: 250,
        grid: [
          { row: 0, column: 0, symbol: symbols[0].symbol, interval: '15' },
        ]
      }
      hookForm.reset(baseLayout)
      setAddMode(true)
    }
  }

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={6} >
          {!addMode && <ReactHookFormSelect
            id="name"
            name="name"
            label={t('Symbol')}
            control={hookForm.control}
            defaultValue=""
          >
            {layouts.map((lay) => <MenuItem key={'name' + lay.id} value={lay.name}>{lay.name}</MenuItem>)}
          </ReactHookFormSelect>}
          {addMode &&
            <TextField
              variant="standard"
              fullWidth
              required
              label={t('GenName')}
              {...hookForm.register('name')}
            />
          }
        </Grid>
        <Grid item xs={6} >
          <Button onClick={() => addModeChange()}>{addMode ? "Cancel" : "Add new Layout"}</Button>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <WidgetsBaseSettingsForm hookForm={hookForm} />
          </Stack>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {
            fields.map((field, index) => {
              return (
                <Grid key={field.id} item md={12 / hookForm.getValues("columns")} >
                  <NewChartForm defaultValue={null} symbolSelectName={`grid.${index}.symbol`}
                    intervalSelectName={`grid.${index}.interval`} symbols={symbols} control={hookForm.control}
                    intervalColumns={Array.from(Array(1))} intervalOptions={intervalOptionsInit} />
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>

    </Stack>
  )
}


export default LayoutsForm

/**
 * Select layout | Add new layout
 * Layout name editable | number of rows | number of columns | height
 * Layout settings
 * 
 * 
 * 
 */