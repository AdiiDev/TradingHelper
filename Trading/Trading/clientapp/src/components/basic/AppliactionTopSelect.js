import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

const ApplicationTopSelect = () => {
  const { t } = useTranslation()
  const [openMenu, setOpenMenu] = useState(null)
  const brokerAccountData = useSelector(
    (state) => state.brokerAccounts.loadBrokerAccount
  )
  const defaultAccount = useSelector(
    (state) => state.brokerAccounts.selectedBroker
  )
  const userData = useSelector((state) => state.config)
  const [selectedAccount, setSelectedAccount] = useState(null)

  useEffect(() => {
    setSelectedAccount(defaultAccount)
  }, [defaultAccount])

  const handleMenu = (event) => {
    setOpenMenu(event.currentTarget)
  }

  const handleClose = () => {
    setOpenMenu(null)
  }

  const handleAccountChange = (event) => {
    const selectedId = event.target.value
    const selectedBroker = brokerAccountData.find(
      (account) => account.id === selectedId
    )
    setSelectedAccount(selectedBroker)
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
          <TextField
            className="Top-select-bar-form"
            id="user"
            label={t('BrokerName')}
            size="small"
            variant="outlined"
            select
            value={selectedAccount ? selectedAccount.id : ''}
            onChange={handleAccountChange}
          >
            {brokerAccountData.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.brokerName}
              </MenuItem>
            ))}
          </TextField>

          <div className="Top-select-bar-div">
            <p className="Top-select-bar-p">{userData.username}</p>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={openMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(openMenu)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/home">{t('Profile')}</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/SettingsPage">{t('Settings')}</Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ApplicationTopSelect
