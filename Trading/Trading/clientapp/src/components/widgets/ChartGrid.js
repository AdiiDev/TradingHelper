import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import ChartEmpty from './ChartEmpty'
import Chart from './Chart'
import { clearTVSciptLoadingPromises } from '../../services/ChartService'

// rows, columns, height
const ChartGrid = ({ settings, currentWidgetsArray, setCurrentWidgetsArray, selectedLayout }) => {
  const [maximize, setMaximize] = useState({ row: -1, column: -1 })

  useEffect(() => {
    console.log('Call on selectedLayout.id change')
    if (selectedLayout !== null) {
      console.log('Clearing promises')
      clearTVSciptLoadingPromises()

      // React is keeping part of the grid in memory if we won't clear rows and columns?
      setCurrentWidgetsArray([])
      setCurrentWidgetsArray(selectedLayout.grid)
    }
  }, [selectedLayout?.id])

  const changeMax = (rowId, columnId) => {
    if (maximize.row === rowId && maximize.column === columnId)
      setMaximize({ row: -1, column: -1 })
    else
      setMaximize({ row: rowId, column: columnId })
  }

  const addNewCharts = (chartsInfo) => {
    let newArray = [...currentWidgetsArray]
    if (chartsInfo.intervals.length > 1) {
      for (let i = 0; i < chartsInfo.intervals.length; i++)
        newArray.push({ row: chartsInfo.row, column: i, symbol: chartsInfo.symbol, interval: chartsInfo.intervals[i] })
    }
    else {
      newArray.push({ row: chartsInfo.row, column: chartsInfo.column, symbol: chartsInfo.symbol, interval: chartsInfo.intervals[0] })
    }
    setCurrentWidgetsArray(newArray)
  }

  const removeChart = (rowId, columnId) => {
    const newArray = currentWidgetsArray.filter(x => !(x.row === rowId && x.column === columnId))
    setCurrentWidgetsArray(newArray)
  }

  const rows = selectedLayout !== null ? selectedLayout.rows : settings.rows
  const columns = selectedLayout !== null ? selectedLayout.columns : settings.columns

  return (
    <div>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <Grid container spacing={2} key={`row-${rowIndex}`}>
          {Array.from({ length: columns }, (_, columnIndex) => {
            const isInArray = currentWidgetsArray.find(element => element.row === rowIndex && element.column === columnIndex)
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
            const isSelected = maximize.row === rowIndex && maximize.column === columnIndex
            const heightTV = isSelected ? vh - 48 : settings.height

            if (!isInArray) {
              console.log('Creating empty chart')
              return (<ChartEmpty key={`column-${columnIndex}-r-${rowIndex}`} heightTV={heightTV}
                rowIndex={rowIndex} columnIndex={columnIndex} columns={columns}
                addNewCharts={(chartInfo) => addNewCharts(chartInfo)} />)

            }

            return (<Chart key={`column-${columnIndex}-r-${rowIndex}`} heightTV={heightTV}
              isSelected={isSelected} columns={columns} columnIndex={columnIndex} rowIndex={rowIndex}
              changeMax={(row, col) => changeMax(row, col)} symbol={isInArray.symbol} interval={isInArray.interval}
              removeChart={(row, col) => removeChart(row, col)} />)
          })}
        </Grid>
      ))}
    </div>
  )
}

export default ChartGrid