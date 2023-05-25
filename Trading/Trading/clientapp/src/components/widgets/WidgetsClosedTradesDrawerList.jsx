import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const WidgetsClosedTradesDrawerList = ({
  trades,
  setOpenTradeForm,
  setTradeData,
}) => {
  const { t } = useTranslation()
  const tradingPairsData = useSelector(
    (state) => state.tradingPairs.tradingPairs
  )
  const confirmationsData = useSelector(
    (state) => state.confirmations.confirmations
  )

  const handleTradeClick = (event) => (trade) => {
    const matchConfirmations = confirmationsData.filter((confirm) =>
      trade.confirmations.includes(confirm.id)
    )
    setTradeData({ ...trade, confirmations: matchConfirmations })
    setOpenTradeForm(true)
  }

  return (
    <List>
      <Grid container>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            {t('StartTrade').toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            {t('EndTrade').toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            {t('TradingPairs').toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            {t('ProfitLoss').toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
      {trades?.map((trade) => {
        const matchingPair = tradingPairsData.find(
          (pair) => pair.id === trade.tradingPairId
        )
        return (
          <React.Fragment key={`${trade.startTrade}-${trade.endTrade}`}>
            <ListItem
              button
              onClick={(event) => handleTradeClick(event)(trade)}
            >
              <Grid container>
                <Grid item xs={3}>
                  <Typography
                    sx={{ minWidth: '33vh', textAlign: 'center' }}
                    key={trade.startTrade}
                  >
                    {trade.startTrade.replace('T', ' ')}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{ minWidth: '25vh', textAlign: 'center' }}
                    key={trade.endTrade}
                  >
                    {trade.endTrade.replace('T', ' ')}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{ minWidth: '33vh', textAlign: 'center' }}
                    key={trade.tradingPairId}
                  >
                    {matchingPair && matchingPair.symbol}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      minWidth: '33vh',
                      textAlign: 'center',
                      color: `${trade.profitLoss > 0 ? 'darkgreen' : 'red'}`,
                      fontWeight: 'bolder',
                    }}
                    key={trade.profitLoss}
                  >
                    {trade.profitLoss}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider key={`divider-${trade.endTrade}`} />
          </React.Fragment>
        )
      })}
    </List>
  )
}

export default WidgetsClosedTradesDrawerList
