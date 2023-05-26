import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Tooltip from '@mui/material/Tooltip'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import Typography from '@mui/material/Typography'

export const WidgetsDrawer = () => {
  const { t } = useTranslation()
  const symbols = useSelector((state) => state.tradingPairs.tradingPairs)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      <div className="button-drawerOpen">
        <Tooltip title={t('OpenDrawer')}>
          <Button onClick={toggleDrawer}>
            <MenuOpenIcon fontSize="large" />
          </Button>
        </Tooltip>
      </div>
      <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer}>
        <div className={'drawer'}>
          <List>
            <Typography>{t('Symbols')}</Typography>
            {symbols.map((symbol) => (
              <ListItem button key={symbol.id}>
                <ListItemText primary={symbol.symbol} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  )
}

export default WidgetsDrawer
