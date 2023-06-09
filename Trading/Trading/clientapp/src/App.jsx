import './App.css'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/system'
import { createTheme } from '@mui/material/styles'
import { getDesignTokens } from './styles/CustomTheme'
import AppConfigurationService from './services/config/AppConfigurationService'
import DictionaryAccountService from './services/dictionary/DictionaryAccountService'
import DictionaryConfirmationService from './services/dictionary/DictionaryConfirmationsService'
import DictionaryTradingPairsService from './services/dictionary/DictionaryTradingPairsService'
import IntervalService from './services/dictionary/IntervalService'
import { setConfig } from './services/config/ConfigSlice'
import { setBrokerAccounts } from './services/dictionary/BrokerAccountSlice'
import { setConfirmations } from './services/dictionary/ConfirmationSlice'
import { setTradingPairs } from './services/dictionary/TradingPairsSlice'
import { setIntervals } from './services/dictionary/IntervalsSlice'
import { NavigationBarLeft } from './components/basic/NavigationBarLeft'
import ApplicationBar from './components/basic/ApplicationBar'
import ApplicationTopSelect from './components/basic/AppliactionTopSelect'
import { AppConfigPage } from './pages/AppConfigPage'
import DashboardPage from './pages/DashboardPage'
import DictionaryPage from './pages/DictionaryPage'
import TradesPage from './pages/TradesPage'
import WidgetsPage from './pages/WidgetsPage'
import SettingsPage from './pages/SettingsPage'
import LayoutsService from './services/config/LayoutsService'
import { setLayouts } from './services/config/LayoutsConfigSlice'

// MUI controls with hook form
//https://codesandbox.io/s/react-hook-form-v6-controller-qsd8r
// Styling
//https://mui.com/system/getting-started/usage/

const env = import.meta.env.VITE_ENV

const AppRouter = env === 'win' ? HashRouter : BrowserRouter

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const App = () => {
  const { t } = useTranslation()
  const [configIsEmpty, setConfigIsEmpty] = useState(true)
  const [callDone, setCallDone] = useState(false)
  const [mode, setMode] = useState('dark')
  const dispatch = useDispatch()
  const [showTopBar, setShowTopBar] = useState(true)
  const [showLeftBar, setShowLeftBar] = useState(true)

  useEffect(() => {
    const checkConfig = async () => {
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

      const [accounts, confirmations, tradingPairs, intervals, layouts] =
        await Promise.all([
          DictionaryAccountService.GetAccounts(),
          DictionaryConfirmationService.GetConfirmations(),
          DictionaryTradingPairsService.GetTradingPairs(),
          IntervalService.Get(),
          LayoutsService.Get(),
        ])

      if (accounts.isError) {
        return
      }
      dispatch(setBrokerAccounts(accounts.result))

      if (confirmations.isError) {
        return
      }
      dispatch(setConfirmations(confirmations.result))

      if (tradingPairs.isError) {
        return
      }
      dispatch(setTradingPairs(tradingPairs.result))

      if (intervals.isError) {
        // Here should be log or toast
        return
      } else dispatch(setIntervals(intervals.result))

      if (layouts.isError) {
        // Here should be log or toast
        return
      } else dispatch(setLayouts(layouts.result))
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
        limit={3}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode}
      />
      <ThemeProvider theme={theme}>
        {env === 'win' && <ApplicationBar />}
        <div className={'App ' + (env === 'win' ? 'App-win' : '')}>
          <CssBaseline enableColorScheme />
          <AppRouter>
            {!configIsEmpty && callDone && (
              <div>
                {showTopBar && <ApplicationTopSelect />}
                {showLeftBar && (
                  <NavigationBarLeft
                    themeMode={mode}
                    changeTheme={colorMode.toggleColorMode}
                  />
                )}
                <Routes>
                  <Route
                    path="/home"
                    element={
                      <DashboardPage changeTheme={colorMode.toggleColorMode} />
                    }
                  />
                  <Route path="*" element={<Navigate replace to="/home" />} />
                  <Route path="/TradesPage" element={<TradesPage />} />
                  <Route path="/DictionaryPage" element={<DictionaryPage />} />
                  <Route
                    path="/WidgetsPage"
                    element={
                      <WidgetsPage
                        setShowLeftBar={setShowLeftBar}
                        setShowTopBar={setShowTopBar}
                      />
                    }
                  />
                  <Route path="/SettingsPage" element={<SettingsPage />} />
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
