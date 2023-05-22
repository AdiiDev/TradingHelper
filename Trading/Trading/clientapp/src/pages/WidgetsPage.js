import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'
import Fab from '@mui/material/Fab'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {
  setLayouts,
  setShowLayout,
} from '../services/config/LayoutsConfigSlice'
import WrapperBasicPage from '../components/common/WrapperBasicPage'
import WidgetsDrawer from '../components/widgets/WidgetsDrawer'
import ChartGrid from '../components/widgets/ChartGrid'
import ChartsSettingsDialog from '../components/widgets/ChartsSettingsDialog'
import LayoutsService from '../services/config/LayoutsService'

const baseSettingsSchema = yup.object().shape({
  columns: yup
    .number()
    .required()
    .min(1, 'ColumnNumberMustBeGreaterThanOrEqualTo1')
    .max(12, 'ColumnNumberMustBeLessThanOrEqualTo12'),
  rows: yup
    .number()
    .required()
    .min(1, 'RowNumberMustBeGreaterThanOrEqualTo1')
    .max(12, 'RowNumberMustBeLessThanOrEqualTo12'),
  height: yup.number().min(50).max(1000),
})

const WidgetsPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const selectedLayout = useSelector((state) => state.layouts.selectedLayout)
  const [baseSettings, setBaseSettings] = useState({
    columns: 2,
    rows: 2,
    height: 500,
  })
  const [currentWidgetsArray, setCurrentWidgetsArray] = useState([])
  const [openChartGridSettings, setOpenChartGridSettings] = useState(false)
  const [hide, setHide] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const useMiltipleForm = (defaultValues, resolver) => {
    console.log('Call')
    return useForm({ resolver: resolver, defaultValues: defaultValues })
  }

  const baseSettingsForm = useMiltipleForm(
    null,
    yupResolver(baseSettingsSchema)
  )
  const layoutSettingsForm = useMiltipleForm(
    null,
    yupResolver(baseSettingsSchema)
  )

  useEffect(() => {
    dispatch(setShowLayout(true))

    return () => {
      dispatch(setShowLayout(false))
    }
  }, [])

  const handleBaseFormSubmit = (data) => {
    setBaseSettings({
      columns: data.columns,
      rows: data.rows,
      height: data.height,
    })
    setOpenChartGridSettings(false)
  }

  const handleLayouts = async (data) => {
    console.log('Handle layouts', data)
    const res = await LayoutsService.AddOrUpdate(data)
    if (res.isError) {
      console.log('Error', res.isError)
      return
    }
    const layouts = await LayoutsService.Get()
    if (layouts.isError) {
      // Here should be log or toast
      return
    } else dispatch(setLayouts(layouts.result))
    setOpenChartGridSettings(false)
  }

  const openSettings = () => {
    baseSettingsForm.reset(baseSettings)
    setOpenChartGridSettings(true)
  }

  return (
    <WrapperBasicPage>
      <Tooltip title={t('OpenDrawer')}>
        <Fab
          size="small"
          color="primary"
          onClick={() => setDrawerOpen(true)}
          className="drawer-fab-button"
        >
          <MenuOpenIcon />
        </Fab>
      </Tooltip>
      {openChartGridSettings && (
        <ChartsSettingsDialog
          close={() => setOpenChartGridSettings(false)}
          baseSettings={baseSettingsForm}
          handleBase={(data) => handleBaseFormSubmit(data)}
          layoutHook={layoutSettingsForm}
          handleLayouts={(data) => handleLayouts(data)}
        />
      )}
      <div style={{ minHeight: '80vh', width: '100%' }}>
        <div
          className="Chart-settings-buttons"
          style={{ top: 4, width: '100px', right: '40%' }}
        >
          <Tooltip title={t('SetView')}>
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              onClick={() => openSettings()}
            >
              <DisplaySettingsIcon />
            </Fab>
          </Tooltip>
          <Tooltip title={t('GeName')}>
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              onClick={() => setHide(!hide)}
            >
              <DisplaySettingsIcon />
            </Fab>
          </Tooltip>
        </div>
        <div className={hide ? 'test-hide' : ''}>
          <ChartGrid
            settings={baseSettings}
            selectedLayout={selectedLayout}
            currentWidgetsArray={currentWidgetsArray}
            setCurrentWidgetsArray={setCurrentWidgetsArray}
          />
        </div>
      </div>

      {drawerOpen && <WidgetsDrawer setDrawerOpen={setDrawerOpen} />}
    </WrapperBasicPage>
  )
}

export default WidgetsPage
