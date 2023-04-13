import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import WrapperBasicPage from '../components/common/WrapperBasicPage'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import Fab from '@mui/material/Fab'
import GridViewIcon from '@mui/icons-material/GridView'
import WidgetsForm from '../components/widgets/WidgetsForm'
import WidgetsDrawer from '../components/widgets/WidgetsDrawer'
import WidgetsGridElement from '../components/widgets/WidgetsGridElement'

const WidgetsPage = () => {
  const { t } = useTranslation()
  const [openWidgetsForm, setOpenWidgetsForm] = useState(false)
  const [columns, setColumns] = useState(0)
  const [rows, setRows] = useState(0)
  const [heights, setHeights] = useState(200)

  const handleFormSubmit = (data) => {
    setColumns(data.columns)
    setRows(data.rows)
    setHeights(data.height)
  }

  const rowsArray = Array.from({ length: rows }, (_, rowIndex) => (
    <Grid container spacing={3} key={`row-${rowIndex}`}>
      {Array.from({ length: columns }, (_, columnIndex) => (
        <Grid item xs={12 / columns} key={`column-${columnIndex}`}>
          <WidgetsGridElement
            key={`${rowIndex}/${columnIndex}`}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            height={heights}
          />
        </Grid>
      ))}
      {rowIndex < rows - 1 && (
        <Grid
          item
          xs={12}
          key={`row-${rowIndex}-separator`}
          style={{ height: 20 }}
        ></Grid>
      )}
    </Grid>
  ))

  return (
    <WrapperBasicPage>
      <WidgetsForm
        handleFormSubmit={handleFormSubmit}
        openWidgetsForm={openWidgetsForm}
        setOpenWidgetsForm={(bool) => setOpenWidgetsForm(bool)}
      />
      <div style={{ minHeight: '80vh', width: '100%' }}>
        <Tooltip title={t('SetView')}>
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            sx={{ position: 'absolute', top: 76, right: 14 }}
            onClick={() => setOpenWidgetsForm(true)}
          >
            <GridViewIcon />
          </Fab>
        </Tooltip>
        {rowsArray}
      </div>
      <WidgetsDrawer />
    </WrapperBasicPage>
  )
}

export default WidgetsPage
