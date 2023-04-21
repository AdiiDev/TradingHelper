import { useState } from 'react'
import Grid from '@mui/material/Grid'
import ChartEmpty from './ChartEmpty'
import Chart from './Chart'

const ChartGrid = ({ rows, columns, height, currentWidgetsArray, setCurrentWidgetsArray }) => {
  const [maximize, setMaximize] = useState({ row: -1, column: -1 })

  const changeMax = (rowId, columnId) => {
    if (maximize.row === rowId && maximize.column === columnId)
      setMaximize({ row: -1, column: -1 })
    else
      setMaximize({ row: rowId, column: columnId })
  }

  const addNewChart = (rowId, columnId) => {
    let newArray = [...currentWidgetsArray]
    newArray.push({ row: rowId, column: columnId })
    setCurrentWidgetsArray(newArray)
  }

  return (<div>
    {Array.from({ length: rows }, (_, rowIndex) => (
      <Grid container spacing={2} key={`row-${rowIndex}`}>
        {Array.from({ length: columns }, (_, columnIndex) => {
          const isInArray = currentWidgetsArray.find(element => element.row === rowIndex && element.column === columnIndex)
          const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
          const isSelected = maximize.row === rowIndex && maximize.column === columnIndex
          const heightTV = isSelected ? vh - 48 : height
          if (!isInArray)
            return (<ChartEmpty key={`column-${columnIndex}-r-${rowIndex}`} heightTV={heightTV} rowIndex={rowIndex} columnIndex={columnIndex} columns={columns} addNewChart={(rowId, columnId) => addNewChart(rowId, columnId)} />)

          return (<Chart key={`column-${columnIndex}-r-${rowIndex}`} heightTV={heightTV} isSelected={isSelected} columns={columns} columnIndex={columnIndex} rowIndex={rowIndex} changeMax={(row, col) => changeMax(row, col)} />)
        })}
      </Grid>
    ))}
  </div>)
}

export default ChartGrid