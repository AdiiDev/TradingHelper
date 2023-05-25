import React from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'
import Fab from '@mui/material/Fab'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import AddIcon from '@mui/icons-material/Add'

const WidgetsButtonBox = ({
  setOpenTradeForm,
  setDrawerSymbolsOpen,
  setHide,
  setDrawerTradesOpen,
  openSettings,
  hide,
}) => {
  const { t } = useTranslation()
  return (
    <div
      className="Chart-settings-buttons"
      style={{ top: 4, width: '300px', right: '40%' }}
    >
      <Tooltip title={t('AddTrade')}>
        <Fab
          color="secondary"
          size="small"
          sx={{ marginRight: '1px' }}
          onClick={() => setOpenTradeForm(true)}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Tooltip title={t('OpenDrawerSymbols')}>
        <Fab
          size="small"
          sx={{ marginRight: '1px' }}
          color="secondary"
          onClick={() => setDrawerSymbolsOpen(true)}
        >
          <MenuOpenIcon />
        </Fab>
      </Tooltip>
      <Tooltip title={t('OpenTradesDrawer')}>
        <Fab
          size="small"
          color="secondary"
          sx={{ marginRight: '5px' }}
          onClick={() => setDrawerTradesOpen(true)}
        >
          <MenuOpenIcon sx={{ transform: 'rotate(90deg)' }} />
        </Fab>
      </Tooltip>
      <Tooltip title={t('SetView')}>
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          sx={{ marginRight: '1px' }}
          onClick={() => openSettings()}
        >
          <DisplaySettingsIcon />
        </Fab>
      </Tooltip>
      <Tooltip title={t('GeName')}>
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          onClick={() => setHide(!hide)}
        >
          <DisplaySettingsIcon />
        </Fab>
      </Tooltip>
    </div>
  )
}

export default WidgetsButtonBox
