import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import ApiIcon from '@mui/icons-material/Api'
import { useTheme } from '@mui/material/styles'

const ApplicationBar = () => {
  const theme = useTheme()

  const close = () => {
    if (process.env.REACT_APP_MYVAR === 'win') {
      const { ipcRenderer } = window.require('electron')
      ipcRenderer.send("close")
    }
  }

  const devTools = () => {
    if (process.env.REACT_APP_MYVAR === 'win') {
      const { ipcRenderer } = window.require('electron')
      ipcRenderer.send("dev-tools")
    }
  }

  const size = () => {
    if (process.env.REACT_APP_MYVAR === 'win') {
      const { ipcRenderer } = window.require('electron')
      ipcRenderer.send("toggle-maximize-window")
    }
  }

  const reload = () => {
    if (process.env.REACT_APP_MYVAR === 'win') {
      const { ipcRenderer } = window.require('electron')
      ipcRenderer.send("reload-web")
    }
  }

  const minimize = () => {
    if (process.env.REACT_APP_MYVAR === 'win') {
      const { ipcRenderer } = window.require('electron')
      ipcRenderer.send("minimize")
    }
  }

  return (
    <div className="Application-bar">
      <Box
        sx={{
          flexGrow: 1,
          maxHeight: '32px',
        }}
        className="Application-bar"
      >
        <AppBar position="static">
          <Toolbar
            variant="dense"
            sx={{
              paddingLeft: '25px',
              minHeight: '5px !important',
              maxHeight: '32px !important',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              paddingRight: '0px !important',
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <IconButton
              className="Application-bar-buttons"
              edge="start"
              color="inherit"
              aria-label="devtools"
              onClick={() => devTools()}
              sx={{ mr: '5px' }}
            >
              <ApiIcon
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </IconButton>
            <Button
              className="Application-bar-buttons"
              onClick={() => reload()}
              sx={{ mr: 10 }}
            >
              Reload
            </Button>
            <Button
              className="Application-bar-buttons"
              onClick={() => minimize()}
            >
              &minus;
            </Button>
            <Button className="Application-bar-buttons" onClick={() => size()}>
              &#9744;
            </Button>
            <Button className="Application-bar-buttons" onClick={() => close()}>
              &#9932;
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default ApplicationBar
