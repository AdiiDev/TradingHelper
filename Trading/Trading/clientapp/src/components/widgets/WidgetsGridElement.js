import React, { useState, useRef } from 'react'
import { Box, IconButton, Paper } from '@mui/material'
import {
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
} from '@mui/icons-material'
import TVChart from './TVChart'

const WidgetsGridElement = ({ rowIndex, columnIndex, height }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const ref = useRef(null)

  const handleFullscreen = () => {
    setIsFullscreen(true)
  }

  const handleClose = () => {
    setIsFullscreen(false)
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleClose()
    }
  }

  const renderContent = () => {
    if (isFullscreen) {
      document.addEventListener('mousedown', handleClickOutside)
      return (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <Paper
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            ref={ref}
          >
            <Box sx={{ flexGrow: 1 }}>
              <TVChart
                rowId={rowIndex + 1}
                columnId={columnIndex + 1}
                height={window.innerHeight}
              />
            </Box>
            <IconButton
              sx={{ position: 'absolute', top: 10, right: 10 }}
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Paper>
        </Box>
      )
    }

    return (
      <Box sx={{ position: 'relative', height: `${height}px` }}>
        <TVChart rowId={rowIndex} columnId={columnIndex} height={height} />
        <IconButton
          sx={{ position: 'absolute', top: 0, right: 25 }}
          color="inherit"
          onClick={handleFullscreen}
        >
          <FullscreenIcon />
        </IconButton>
      </Box>
    )
  }

  return <>{renderContent()}</>
}

export default WidgetsGridElement
