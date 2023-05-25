import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {
  setLayouts,
  setShowLayout,
} from '../services/config/LayoutsConfigSlice'
import WrapperBasicPage from '../components/common/WrapperBasicPage'
import WidgetsDrawerSymbols from '../components/widgets/WidgetsDrawerSymbols'
import WidgetsTradesDrawer from '../components/widgets/WidgetsTradesDrawer'
import ChartGrid from '../components/widgets/ChartGrid'
import ChartsSettingsDialog from '../components/widgets/ChartsSettingsDialog'
import LayoutsService from '../services/config/LayoutsService'
import TradesForm from '../components/trades/TradesForm'
import WidgetsButtonBox from '../components/widgets/WidgetsButtonBox'

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
  const [drawerSymbolsOpen, setDrawerSymbolsOpen] = useState(false)
  const [drawerTradesOpen, setDrawerTradesOpen] = useState(false)
  const [openTradeForm, setOpenTradeForm] = useState(false)

  const useMiltipleForm = (defaultValues, resolver) => {
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
    const res = await LayoutsService.AddOrUpdate(data)
    if (res.isError) {
      console.log('Error', res.isError)
      return
    }
    const layouts = await LayoutsService.Get()
    if (layouts.isError) {
      console.log('Error', res.isError)
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
        <WidgetsButtonBox
          setOpenTradeForm={setOpenTradeForm}
          setDrawerSymbolsOpen={setDrawerSymbolsOpen}
          setHide={setHide}
          setDrawerTradesOpen={setDrawerTradesOpen}
          openSettings={openSettings}
          hide={hide}
        />
        <div className={hide ? 'test-hide' : ''}>
          <ChartGrid
            settings={baseSettings}
            selectedLayout={selectedLayout}
            currentWidgetsArray={currentWidgetsArray}
            setCurrentWidgetsArray={setCurrentWidgetsArray}
          />
        </div>
      </div>

      {drawerSymbolsOpen && (
        <WidgetsDrawerSymbols setDrawerOpen={setDrawerSymbolsOpen} />
      )}
      {drawerTradesOpen && (
        <WidgetsTradesDrawer setDrawerOpen={setDrawerTradesOpen} />
      )}
      {openTradeForm && (
        <TradesForm setOpenDialog={setOpenTradeForm} editData={null} />
      )}
    </WrapperBasicPage>
  )
}

export default WidgetsPage
