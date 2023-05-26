import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Fullscreen from '@mui/icons-material/Fullscreen'
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import TVChart from './TVChart'
import useScroll from '../common/useScroll';
import { tvScriptLoadingPromise } from '../../services/ChartService';

const Chart = ({ heightTV, isSelected, columns, columnIndex, rowIndex, changeMax, symbol, interval, removeChart }) => {
  const [executeScroll, elRef] = useScroll()

  const maximize = () => {
    changeMax(rowIndex, columnIndex)
    setTimeout(() => executeScroll(), 100)
  }

  const remove = () => {
    const index = tvScriptLoadingPromise.findIndex((x) => x.key === rowIndex + '-' + columnIndex)
    if (index > -1) {
      tvScriptLoadingPromise[index].value = null
      console.log('Setting null for', { index, key: rowIndex + '-' + columnIndex })
    }
    removeChart(rowIndex, columnIndex)
  }

  return (
    <Grid ref={elRef} className='Pos-relative' sx={{ height: heightTV <= 100 ? heightTV + 'vh' : heightTV }} item xs={isSelected ? 12 : (12 / columns)} key={`column-${columnIndex}`}>
      <TVChart rowId={rowIndex} columnId={columnIndex} height={heightTV} symbol={symbol} interval={interval} />
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 30 }}
        color="inherit"
        onClick={() => maximize()}
      >
        {isSelected ? <MinimizeIcon /> : <Fullscreen />}
      </IconButton>
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 68 }}
        color="inherit"
        onClick={() => remove()}
      >
        <CloseIcon />
      </IconButton>
    </Grid>
  )
}

export default Chart