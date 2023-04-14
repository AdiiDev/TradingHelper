import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import WrapperBasicPage from '../components/common/WrapperBasicPage'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import Fab from '@mui/material/Fab'
import GridViewIcon from '@mui/icons-material/GridView'
import WidgetsForm from '../components/widgets/WidgetsForm'
import WidgetsDrawer from '../components/widgets/WidgetsDrawer'
import WidgetsGridElement from '../components/widgets/WidgetsGridElement'
import TVChart from '../components/widgets/TVChart'
import IconButton from '@mui/material/IconButton'
import Close from '@mui/icons-material/Close'
import Fullscreen from '@mui/icons-material/Fullscreen'
import MinimizeIcon from '@mui/icons-material/Minimize';

const useScroll = () => {
  const elRef = useRef(null);
  const executeScroll = () => elRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });

  return [executeScroll, elRef];
};

const ChartGrid = ({ heightTV, isSelected, columns, columnIndex, rowIndex, changeMax }) => {
  const [executeScroll, elRef] = useScroll()

  const maximize = () => {
    changeMax(rowIndex, columnIndex)
    setTimeout(() => executeScroll(), 100)
  }

  return (
    <Grid ref={elRef} className='test' sx={{ height: heightTV <= 100 ? heightTV + 'vh' : heightTV }} item xs={isSelected ? 12 : (12 / columns)} key={`column-${columnIndex}`}>
      <TVChart rowId={rowIndex} columnId={columnIndex} height={heightTV} />
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 30 }}
        color="inherit"
        onClick={() => maximize()}
      >
        {isSelected ? <MinimizeIcon /> : <Fullscreen />}
      </IconButton>
    </Grid>
  )
}

const TestGrid = ({ rows, columns, height }) => {
  const [maximize, setMaximize] = useState({ row: -1, column: -1 })

  const changeMax = (rowId, columnId) => {
    if (maximize.row === rowId && maximize.column === columnId)
      setMaximize({ row: -1, column: -1 })
    else
      setMaximize({ row: rowId, column: columnId })
    //const section = document.querySelector('#grid-view-tv-chart');
    //section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (<div>
    {Array.from({ length: rows }, (_, rowIndex) => (
      <Grid container spacing={2} key={`row-${rowIndex}`}>
        {Array.from({ length: columns }, (_, columnIndex) => {
          const isSelected = maximize.row === rowIndex && maximize.column === columnIndex
          const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
          const heightTV = isSelected ? vh - 48 : height
          return (<ChartGrid key={`column-${columnIndex}-r-${rowIndex}`} heightTV={heightTV} isSelected={isSelected} columns={columns} columnIndex={columnIndex} rowIndex={rowIndex} changeMax={(row, col) => changeMax(row, col)} />)

          return (
            <Grid className='test' sx={{ height: heightTV <= 100 ? heightTV + 'vh' : heightTV }} item xs={isSelected ? 12 : (12 / columns)} key={`column-${columnIndex}`}>
              <TVChart rowId={rowIndex} columnId={columnIndex} height={heightTV} />
              <IconButton
                sx={{ position: 'absolute', top: 16, right: 30 }}
                color="inherit"
                onClick={() => changeMax(rowIndex, columnIndex)}
              >
                {isSelected ? <MinimizeIcon /> : <Fullscreen />}
              </IconButton>
            </Grid>
          )
        })}
      </Grid>
    ))}
  </div>)
}

const WidgetsPage = () => {
  const { t } = useTranslation()
  const [openWidgetsForm, setOpenWidgetsForm] = useState(false)
  const [columns, setColumns] = useState(2)
  const [rows, setRows] = useState(2)
  const [heights, setHeights] = useState(500)

  const handleFormSubmit = (data) => {
    setColumns(data.columns)
    setRows(data.rows)
    setHeights(data.height)
  }

  /*const rowsArray = Array.from({ length: rows }, (_, rowIndex) => (
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
  ))*/

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
        {/*rowsArray*/}
        <TestGrid rows={rows} columns={columns} height={heights} />
      </div>
      <WidgetsDrawer />
    </WrapperBasicPage>
  )
}

export default WidgetsPage
