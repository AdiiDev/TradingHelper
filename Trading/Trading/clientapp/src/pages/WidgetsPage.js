import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'
import Fab from '@mui/material/Fab'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import WrapperBasicPage from '../components/common/WrapperBasicPage'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import WidgetsDrawer from '../components/widgets/WidgetsDrawer'
import ChartGrid from '../components/widgets/ChartGrid'
import { useForm } from 'react-hook-form'
import ChartsSettingsDialog from '../components/widgets/ChartsSettingsDialog'

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
  const [baseSettings, setBaseSettings] = useState({ columns: 2, rows: 2, height: 500 })
  const [currentWidgetsArray, setCurrentWidgetsArray] = useState([])
  const [openChartGridSettings, setOpenChartGridSettings] = useState(false)

  const useMiltipleForm = (defaultValues, resolver) => {
    console.log('Call')
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: resolver, defaultValues: defaultValues })
    return { register, handleSubmit, reset, formState: { errors } }
  }

  const baseSettingsForm = useMiltipleForm(yupResolver(baseSettingsSchema))
  const advancedSettingsForm = useMiltipleForm()

  const handleBaseFormSubmit = (data) => {
    setBaseSettings({ columns: data.columns, rows: data.rows, height: data.height })
    setOpenChartGridSettings(false)
  }

  const openSettings = () => {
    baseSettingsForm.reset(baseSettings)
    setOpenChartGridSettings(true)
  }


  return (
    <WrapperBasicPage>
      {openChartGridSettings &&
        <ChartsSettingsDialog close={() => setOpenChartGridSettings(false)}
          baseSettings={baseSettingsForm} handleBase={(data) => handleBaseFormSubmit(data)} />}
      <div style={{ minHeight: '80vh', width: '100%' }}>
        <div className='Chart-settings-buttons' style={{ top: 4, width: '100px', right: '40%' }}>
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

        </div>
        <ChartGrid settings={baseSettings} currentWidgetsArray={currentWidgetsArray} setCurrentWidgetsArray={setCurrentWidgetsArray} />
      </div>
      <WidgetsDrawer />
    </WrapperBasicPage>
  )
}

export default WidgetsPage
