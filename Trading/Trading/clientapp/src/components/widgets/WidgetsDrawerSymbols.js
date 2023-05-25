import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star'
import DictionaryForm from '../dictionaries/DictionaryForm'
import { setTradingPairs } from '../../services/dictionary/TradingPairsSlice'
import DictionaryTradingPairsService from '../../services/dictionary/DictionaryTradingPairsService'
import { tradingPairsColumns } from '../../data'

export const WidgetsDrawerSymbols = ({ setDrawerOpen }) => {
  const { t } = useTranslation()
  const symbols = useSelector((state) => state.tradingPairs.tradingPairs)
  const [openTradingPairsDialog, setOpenTradingPairsDialog] = useState(false)
  const dispatch = useDispatch()

  const handleFormSubmit = async (data) => {
    const tradingPairsData = JSON.stringify({
      id: data.id,
      symbol: data.symbol,
      favourite: JSON.parse(data.favourite),
    })
    const res = await DictionaryTradingPairsService.AddTradingPair(
      tradingPairsData
    )
    if (res.isError) {
      toast.error(t('ErrorUpdate'))
      return
    }
    toast.success(t('Added'))
    const updatedTradingPairs = [
      ...symbols.filter((pair) => pair.id !== res.result.id),
      res.result,
    ]
    dispatch(setTradingPairs(updatedTradingPairs))
    setOpenTradingPairsDialog(false)
  }

  return (
    <Drawer anchor={'right'} open={true} onClose={() => setDrawerOpen(false)}>
      <List>
        <Typography className="drawer-Typography">{t('Symbols')}</Typography>
        {symbols.map((symbol) => (
          <React.Fragment key={symbol.id}>
            <ListItem button>
              {symbol.favourite ? (
                <Typography
                  sx={{ display: 'flex', alignItems: 'center' }}
                  key={symbol.id}
                >
                  {symbol.favourite && (
                    <>
                      <StarIcon
                        sx={{
                          color: 'gold',
                          marginRight: '2px',
                          minWidth: '40px',
                        }}
                      />
                      {symbol.symbol}
                    </>
                  )}
                </Typography>
              ) : (
                <>
                  {' '}
                  <div style={{ minWidth: '40px', marginRight: '2px' }}></div>
                  <Typography key={symbol.id}>{symbol.symbol}</Typography>
                </>
              )}
            </ListItem>
            <Divider key={`divider-${symbol.id}`} />
          </React.Fragment>
        ))}
      </List>
      <Button
        sx={{ margin: '16px', borderRadius: '10px', border: '1px solid' }}
        onClick={() => {
          setOpenTradingPairsDialog(true)
        }}
        variant="filled"
      >
        {t('AddNewSymbol')}
      </Button>
      {openTradingPairsDialog && (
        <DictionaryForm
          title={'TradingPairs'}
          dataInputs={tradingPairsColumns}
          openDialog={true}
          setOpenDialog={setOpenTradingPairsDialog}
          onSubmit={handleFormSubmit}
        />
      )}
    </Drawer>
  )
}

export default WidgetsDrawerSymbols
