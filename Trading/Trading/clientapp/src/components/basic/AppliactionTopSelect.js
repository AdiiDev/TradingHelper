import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSelectedBroker } from '../../services/dictionary/BrokerAccountSlice'
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
  const dispatch = useDispatch()
  const [openMenu, setOpenMenu] = useState(null)
  const brokerAccountData = useSelector(
    (state) => state.brokerAccounts.brokerAccounts
  )

  const brokerSelectedAccount = useSelector(
    (state) => state.brokerAccounts.selectedBroker
  )
  const userData = useSelector((state) => state.config)

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
    dispatch(setSelectedBroker(selectedBroker))
  }

  return (
    <Box
      sx={{ flexGrow: 1, position: 'sticky', top: 0 }}
      className={
        process.env.REACT_APP_MYVAR === 'win'
          ? 'Top-select-bar-win'
          : 'Top-select-bar'
      }
    >
      <AppBar position="sticky" variant="permanent">
        <Toolbar>
          {brokerAccountData.length > 0 ? (
            <TextField
              className="Top-select-bar-form"
              id="user"
              label={t('BrokerName')}
              size="small"
              variant="outlined"
              select
              value={brokerSelectedAccount ? brokerSelectedAccount.id : ''}
              onChange={handleAccountChange}
            >
              {brokerAccountData.map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <div>
              <NavLink to="/DictionaryPage">
                {t('EnterYourBrokerAccount')}
              </NavLink>
            </div>
          )}

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
                <NavLink to="/home">{t('Profile')}</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/SettingsPage">{t('Settings')}</NavLink>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ApplicationTopSelect
