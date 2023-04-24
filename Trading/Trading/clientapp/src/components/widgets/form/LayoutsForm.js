import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import ReactHookFormSelect from '../../common/ReactHookFormSelect'
import { Button } from '@mui/material'
import WidgetsBaseSettingsForm from './WidgetsBaseSettingsForm'

const LayoutsForm = ({ layouts, hookForm }) => {
  const { t } = useTranslation();
  const watchRows = hookForm.watch("rows") // after , you can provide default value
  const watchColumns = hookForm.watch("columns")

  useEffect(() => {
    hookForm.reset(layouts[0])
  }, [])

  useEffect(() => {
    const rows = hookForm.getValues("rows")
    const columns = hookForm.getValues("columns")
    setWatchedError(rows, 'rows', 'Err rows')
    setWatchedError(columns, 'columns', 'Err columns')
  }, [watchRows, watchColumns])

  const setWatchedError = (value, name, errLabel) => {
    if (value) {
      if (value > 12) {
        console.log('Check value', { name, value })
        hookForm.setError(name, { type: "focus", message: errLabel })
      }
    }
  }

  const newLayout = () => {
    console.log('data', hookForm.getValues())
  }
  console.log('Render')
  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={6} >
          <ReactHookFormSelect
            id="symbol"
            name="symbol"
            label={t('Symbol')}
            control={hookForm.control}
            defaultValue={layouts[0].id}
          >
            {layouts.map((lay) => <MenuItem key={'symbol' + lay.id} value={lay.id}>{lay.name}</MenuItem>)}
          </ReactHookFormSelect>
        </Grid>
        <Grid item xs={6} >
          <Button onClick={() => newLayout()}>Add new Layout</Button>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <WidgetsBaseSettingsForm hookForm={hookForm} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {Array.from({ length: hookForm.getValues("rows") > 12 ? 12 : hookForm.getValues("rows") }, (_, rowIndex) => {

            return (
              <Grid key={"row" + rowIndex} container spacing={2}>
                {Array.from({ length: hookForm.getValues("columns") > 12 ? 12 : hookForm.getValues("columns") }, (_, columnIndex) => {
                  const key = "el" + rowIndex + "c" + columnIndex
                  return (
                    <LayoutGridElement key={key} rowIndex={rowIndex} columnIndex={columnIndex} />
                  )
                })}
              </Grid>
            )
          })}
        </Grid>
      </Grid>

    </Stack>
  )
}

const LayoutGridElement = ({ rowIndex, columnIndex }) => {
  return (
    <Grid item>{"row=" + rowIndex + ", column=" + columnIndex}</Grid>
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