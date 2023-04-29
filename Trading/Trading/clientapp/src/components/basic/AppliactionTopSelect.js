import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSelectedBroker } from '../../services/dictionary/BrokerAccountSlice'
import { changeLayout } from '../../services/config/LayoutsConfigSlice'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import { Stack } from '@mui/material'

const ApplicationTopSelect = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [openMenu, setOpenMenu] = useState(null)

  const userData = useSelector((state) => state.config)
  const brokerAccountData = useSelector(
    (state) => state.brokerAccounts.brokerAccounts
  )
  const brokerSelectedAccount = useSelector(
    (state) => state.brokerAccounts.selectedBroker
  )
  const layouts = useSelector((state) => state.layouts.layouts)
  const selectedLayout = useSelector((state) => state.layouts.selectedLayout)
  const showSelectedLayout = useSelector(
    (state) => state.layouts.showLayoutsSelect
  )

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

  const handleChangeLayout = (event) => {
    const id = event.target.value
    const layout = layouts.find((x) => x.id === id)
    dispatch(changeLayout(layout))
  }

  console.log('Layouts', layouts)

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
          <Stack direction="row" spacing={2}>
            {brokerAccountData.length > 0 ? (
              <Box sx={{ minWidth: 180 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="broker-label">{t('BrokerName')}</InputLabel>
                  <Select
                    labelId="broker-label"
                    id="broker-select"
                    value={
                      brokerSelectedAccount ? brokerSelectedAccount.id : ''
                    }
                    label={t('BrokerName')}
                    onChange={(e) => handleAccountChange(e)}
                  >
                    {brokerAccountData.map((account) => (
                      <MenuItem key={'ac' + account.id} value={account.id}>
                        {account.brokerName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <div>
                <Link to="/DictionaryPage">{t('EnterYourBrokerAccount')}</Link>
              </div>
            )}
            {showSelectedLayout && (
              <Box sx={{ minWidth: 180 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-label">Layout</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedLayout !== null ? selectedLayout.id : 0}
                    label="layout"
                    onChange={(e) => handleChangeLayout(e)}
                  >
                    <MenuItem key={'la'} value={0}>
                      Sandbox
                    </MenuItem>
                    {layouts.map((lay) => (
                      <MenuItem key={'la' + lay.id} value={lay.id}>
                        {lay.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </Stack>

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
