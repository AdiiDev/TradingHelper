import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'
import Fab from '@mui/material/Fab'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings'
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
import TVChart from '../components/widgets/TVChart'
import IconButton from '@mui/material/IconButton'
import Fullscreen from '@mui/icons-material/Fullscreen'
import MinimizeIcon from '@mui/icons-material/Minimize'

const useScroll = () => {
  const elRef = useRef(null)
  const executeScroll = () =>
    elRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })

  return [executeScroll, elRef]
}

const Chart = ({
  heightTV,
  isSelected,
  columns,
  columnIndex,
  rowIndex,
  changeMax,
}) => {
  const [executeScroll, elRef] = useScroll()

  const maximize = () => {
    changeMax(rowIndex, columnIndex)
    setTimeout(() => executeScroll(), 100)
  }

  return (
    <Grid
      ref={elRef}
      className="test"
      sx={{ height: heightTV <= 100 ? heightTV + 'vh' : heightTV }}
      item
      xs={isSelected ? 12 : 12 / columns}
      key={`column-${columnIndex}`}
    >
      <TVChart rowId={rowIndex} columnId={columnIndex} height={heightTV} />
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 30 }}
        color="inherit"
        onClick={() => maximize()}
      >
        {isSelected ? <MinimizeIcon /> : <Fullscreen />}
      </IconButton>
    </Grid>
  )
}

const ChartGrid = ({ rows, columns, height }) => {
  const [maximize, setMaximize] = useState({ row: -1, column: -1 })

  const changeMax = (rowId, columnId) => {
    if (maximize.row === rowId && maximize.column === columnId)
      setMaximize({ row: -1, column: -1 })
    else setMaximize({ row: rowId, column: columnId })
  }

  return (
    <div>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <Grid container spacing={2} key={`row-${rowIndex}`}>
          {Array.from({ length: columns }, (_, columnIndex) => {
            const isSelected =
              maximize.row === rowIndex && maximize.column === columnIndex
            const vh = Math.max(
              document.documentElement.clientHeight || 0,
              window.innerHeight || 0
            )
            const heightTV = isSelected ? vh - 48 : height
            return (
              <Chart
                key={`column-${columnIndex}-r-${rowIndex}`}
                heightTV={heightTV}
                isSelected={isSelected}
                columns={columns}
                columnIndex={columnIndex}
                rowIndex={rowIndex}
                changeMax={(row, col) => changeMax(row, col)}
              />
            )
          })}
        </Grid>
      ))}
    </div>
  )
}

const WidgetsPage = ({ setShowLeftBar, setShowTopBar }) => {
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
      <WidgetsDrawer />
    </WrapperBasicPage>
  )
}

export default WidgetsPage
