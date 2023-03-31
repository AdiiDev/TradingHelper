import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

const ApplicationTopSelect = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className={
        process.env.REACT_APP_MYVAR === 'win'
          ? 'Top-select-bar-win'
          : 'Top-select-bar'
      }
    >
      <AppBar position="static" variant="permanent">
        <Toolbar>
          <FormControl className="Top-select-bar-form" size="small">
            <InputLabel id="user">User</InputLabel>
            <Select id="demo-simple-select" label="Age">
              <MenuItem>User1</MenuItem>
              <MenuItem>User2</MenuItem>
              <MenuItem>User3</MenuItem>
            </Select>
          </FormControl>
          <div className="Top-select-bar-div">
            <p className="Top-select-bar-p">USERNAME</p>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ApplicationTopSelect
