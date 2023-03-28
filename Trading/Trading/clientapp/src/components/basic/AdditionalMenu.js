import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { Language } from './Language'
import { useTranslation } from 'react-i18next'

export const AdditionalMenu = ({ themeMode, changeTheme }) => {
  const { t } = useTranslation()
  return (
    <List className="AdditionalMenu">
      <Tooltip key={'tol'} title={t('ChangeLanguage')} placement="right">
        <ListItem key="optionLanguage" disablePadding sx={{ display: 'block' }}>
          <Language />
        </ListItem>
      </Tooltip>
      <Tooltip key={'tol2'} title={t('ChangeTheme')} placement="right">
        <ListItem key="optionTheme" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 40,
              justifyContent: true ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => changeTheme()}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
              }}
            >
              {themeMode === 'dark' ? <WbSunnyIcon /> : <DarkModeIcon />}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </Tooltip>
    </List>
  )
}
