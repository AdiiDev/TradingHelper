import { useState } from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { IoAdd } from 'react-icons/io5'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import NewChartsDialog from './NewChartsDialog';

const ChartEmpty = ({ heightTV, isSelected, columns, columnIndex, rowIndex, addNewChart }) => {
  const [openNewChartDialog, setOpenNewChartDialog] = useState(false)
  const [chartData, setChartData] = useState(null)

  const addChart = () => {
    // open drawer with tradingpairs // Now that I think about it dialog will look better
    // select tradingpair
    // add new chart
    setOpenNewChartDialog(true)
    //addNewChart(rowIndex, columnIndex)
  }

  const addCharts = () => {
    // open dialog with input how many, with selection of timeframes and pair
    // add new charts
    // this should work only for one row
  }

  // add tooltips
  return (<Grid sx={{ height: heightTV <= 100 ? heightTV + 'vh' : heightTV, minHeight: heightTV <= 100 ? heightTV + 'vh' : heightTV, padding: 5 }} item xs={isSelected ? 12 : (12 / columns)} key={`column-${columnIndex}`}>
    {openNewChartDialog && <NewChartsDialog onCancel={() => setOpenNewChartDialog(false)} />}
    <Paper style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', alignContent: 'center' }}>
      <IoAdd style={{ height: 48, width: 48, cursor: 'pointer' }} onClick={() => addChart()} />
      {columnIndex === 0 && <AiOutlineAppstoreAdd style={{ height: 48, width: 48, cursor: 'pointer' }} />}
    </Paper>
  </Grid>)
}

export default ChartEmpty