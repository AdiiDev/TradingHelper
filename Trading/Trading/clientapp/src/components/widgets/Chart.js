import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Fullscreen from '@mui/icons-material/Fullscreen'
import MinimizeIcon from '@mui/icons-material/Minimize';
import TVChart from './TVChart'
import useScroll from '../common/useScroll';

const Chart = ({ heightTV, isSelected, columns, columnIndex, rowIndex, changeMax, symbol, interval }) => {
  const [executeScroll, elRef] = useScroll()

  const maximize = () => {
    changeMax(rowIndex, columnIndex)
    setTimeout(() => executeScroll(), 100)
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
    </Grid>
  )
}

export default Chart