import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import API from '../../services/API'
import LoupeIcon from '@mui/icons-material/Loupe'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'

export const NewWindow = () => {
  const [contextMenu, setContextMenu] = useState(null)
  const { t } = useTranslation()

  const handleContextMenu = (event) => {
    event.preventDefault()
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    )
  }

  const handleClose = async (path) => {
    setContextMenu(null)
    if (path) {
      console.log('Option', path)
      const res = await API().get('window/' + path)
    }
    // TODO: handle bad response
  }

  return (
    <List>
      <Tooltip key="tolMenu" title={t('OpenInNewWindow')} placement="right">
        <div onContextMenu={(e) => handleContextMenu(e)}>
          <ListItem key="newWindow" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 40,
                justifyContent: true ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                }}
              >
                <LoupeIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Menu
            open={contextMenu !== null}
            onClose={() => handleClose()}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            <MenuItem onClick={() => handleClose('home')}>Home</MenuItem>
            <MenuItem onClick={() => handleClose('submissionsMonitoring')}>
              Submissions Monitoring
            </MenuItem>
            <MenuItem onClick={() => handleClose('sqs')}>SQS</MenuItem>
            <MenuItem onClick={() => handleClose('settings')}>
              Settings
            </MenuItem>
          </Menu>
        </div>
      </Tooltip>
    </List>
  )
}
