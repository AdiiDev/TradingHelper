import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'
import { AdditionalMenu } from './AdditionalMenu'
import { NewWindow } from './NewWindow'
import { menuOptions } from '../../data'

export const NavigationBarLeft = ({ themeMode, changeTheme }) => {
  const navigate = useNavigate()
  const [currentOption, setCurrentOption] = useState(menuOptions[0])
  const { t } = useTranslation()

  const goTo = (option) => {
    setCurrentOption(option)
    navigate('/' + option.path)
  }

  useEffect(() => {
    const pathName = window.location.pathname.substring(
      1,
      window.location.pathname.length
    )

    const menuElement = menuOptions.filter((menu) =>
      pathName.includes(menu.path)
    )
    if (menuElement.length > 0) {
      setCurrentOption(menuElement[0])
    }
  })

  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={{
        ...(process.env.REACT_APP_MYVAR === 'win' && {
          '& .MuiPaper-root': {
            top: '32px',
            height: 'calc(100vh - 32px)',
            maxHeight: 'calc(100vh - 32px)',
          },
        }),
      }}
      className="fix-drawer"
    >
      {process.env.REACT_APP_MYVAR === 'win' && <NewWindow />}
      <Divider />
      <List>
        {menuOptions.map((option, index) => (
          <Tooltip
            key={'tolMenu' + option.id}
            title={t(option.name)}
            placement="right"
          >
            <ListItem
              key={'option' + option.id}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 40,
                  justifyContent: true ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => goTo(option)}
                selected={currentOption.id === option.id}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                  }}
                >
                  {option.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
      <Divider />
      <AdditionalMenu themeMode={themeMode} changeTheme={changeTheme} />
    </Drawer>
  )
}
