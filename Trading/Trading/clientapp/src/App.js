import './App.css'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/system'
import { createTheme } from '@mui/material/styles'
import { getDesignTokens } from './styles/CustomTheme'
import { NavigationBarLeft } from './components/basic/NavigationBarLeft'
import { AppConfigPage } from './pages/AppConfigPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import AppConfigurationService from './services/AppConfigurationService'
import { useDispatch } from 'react-redux'
import { setConfig } from './services/ConfigSlice'
import { ToastContainer, toast } from 'react-toastify'
import ApplicationBar from './components/basic/ApplicationBar'
import DashboardPage from './pages/DashboardPage'

// MUI controls with hook form
//https://codesandbox.io/s/react-hook-form-v6-controller-qsd8r
// Styling
//https://mui.com/system/getting-started/usage/

const AppRouter =
  process.env.REACT_APP_MYVAR === 'win' ? HashRouter : BrowserRouter

const ColorModeContext = React.createContext({ toggleColorMode: () => { } })

const App = () => {
  const { t } = useTranslation()
  const [configIsEmpty, setConfigIsEmpty] = useState(true)
  const [callDone, setCallDone] = useState(false)
  const [mode, setMode] = useState('dark')
  const dispatch = useDispatch()
  const [user, setUser] = useState('')

  useEffect(() => {
    async function checkConfig() {
      const res = await AppConfigurationService.GetBaseConfig()
      if (res.isError) {
        console.log('Error in config', res.result)
        return
      }
      setConfigIsEmpty(res.result.connectionString.length === 0)
      dispatch(setConfig(res.result))
      setMode(res.result.theme)
      setCallDone(true)
      toast.info(t('Welcome') + ' ' + res.result.username)
      setUser(res.result.username)
    }
    checkConfig()
  }, [])

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  // To modify themes look at https://codesandbox.io/s/4229tx?file=/demo.tsx:262-277
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  // TODO: Change title page? Right now we have ugly scrollbar on code submissions page
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode}
      />
      <ThemeProvider theme={theme}>
        {process.env.REACT_APP_MYVAR === 'win' && <ApplicationBar />}
        <div
          className={
            'App ' + (process.env.REACT_APP_MYVAR === 'win' ? 'App-win' : '')
          }
        >
          <CssBaseline enableColorScheme />
          <AppRouter>
            {!configIsEmpty && callDone && (
              <div>
                <NavigationBarLeft
                  themeMode={mode}
                  changeTheme={colorMode.toggleColorMode}
                />
                <Routes>
                  <Route
                    path="/home"
                    element={
                      <DashboardPage
                        changeTheme={colorMode.toggleColorMode}
                        user={user}
                      />
                    }
                  />
                  <Route path="*" element={<Navigate replace to="/home" />} />
                </Routes>
              </div>
            )}
            {configIsEmpty && callDone && (
              <Routes>
                <Route path="instalation" element={<AppConfigPage />} />
                <Route
                  path="*"
                  element={<Navigate replace to="instalation" />}
                />
              </Routes>
            )}
          </AppRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
