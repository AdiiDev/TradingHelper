import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'
import Fab from '@mui/material/Fab'
import GridViewIcon from '@mui/icons-material/GridView'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import WrapperBasicPage from '../components/common/WrapperBasicPage'
import WidgetsForm from '../components/widgets/form/WidgetsForm'
import WidgetsDrawer from '../components/widgets/WidgetsDrawer'
import ChartGrid from '../components/widgets/ChartGrid'

const WidgetsPage = () => {
  const { t } = useTranslation()
  const [openWidgetsForm, setOpenWidgetsForm] = useState(false)
  const [columns, setColumns] = useState(2)
  const [rows, setRows] = useState(2)
  const [heights, setHeights] = useState(500)
  const [currentWidgetsArray, setCurrentWidgetsArray] = useState([])

  const handleFormSubmit = (data) => {
    setColumns(data.columns)
    setRows(data.rows)
    setHeights(data.height)
  }

  return (
    <WrapperBasicPage>
      <WidgetsForm
        handleFormSubmit={handleFormSubmit}
        openWidgetsForm={openWidgetsForm}
        setOpenWidgetsForm={(bool) => setOpenWidgetsForm(bool)}
      />
      <div style={{ minHeight: '80vh', width: '100%' }}>
        <div className='Chart-settings-buttons' style={{ top: 4, width: '100px', right: '40%' }}>
          <Tooltip title={t('SetView')}>
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              className='M-5p-r'
              onClick={() => setOpenWidgetsForm(true)}
            >
              <GridViewIcon />
            </Fab>
          </Tooltip>
          <Tooltip title={t('SetView')}>
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              onClick={() => setOpenWidgetsForm(true)}
            >
              <DisplaySettingsIcon />
            </Fab>
          </Tooltip>

        </div>
        <ChartGrid rows={rows} columns={columns} height={heights} currentWidgetsArray={currentWidgetsArray} setCurrentWidgetsArray={setCurrentWidgetsArray} />
      </div>
      <WidgetsDrawer />
    </WrapperBasicPage>
  )
}

export default WidgetsPage
