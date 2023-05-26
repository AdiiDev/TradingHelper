import { useState } from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { IoAdd } from 'react-icons/io5'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip';
import NewChartsDialog from './NewChartsDialog';

const ChartEmpty = ({ heightTV, isSelected, columns, columnIndex, rowIndex, addNewCharts }) => {
  const { t } = useTranslation()
  const [openNewChartDialog, setOpenNewChartDialog] = useState({ open: false, singleMode: true })

  const addCharts = (chartInfo) => {
    const info = { ...chartInfo, row: rowIndex, column: columnIndex }
    setOpenNewChartDialog({ open: false, singleMode: true })
    addNewCharts(info)
  }

  return (
    <Grid sx={{ height: heightTV <= 100 ? heightTV + 'vh' : heightTV, minHeight: heightTV <= 100 ? heightTV + 'vh' : heightTV, padding: 5 }} item xs={isSelected ? 12 : (12 / columns)} key={`column-${columnIndex}`}>
      {openNewChartDialog.open &&
        <NewChartsDialog
          onCancel={() => setOpenNewChartDialog({ open: false, singleMode: true })}
          singleMode={openNewChartDialog.singleMode}
          columns={columns}
          onConfirm={(info) => addCharts(info)}
        />}
      <Paper className='Chart-empty-paper'>
        <Tooltip
          key='charts'
          title={t('AddChart')}
          placement="right"
        >
          <div>
            <IoAdd className='Chart-add-icon'
              onClick={() => setOpenNewChartDialog({ open: true, singleMode: true })}
            />
          </div>
        </Tooltip>
        {columnIndex === 0 &&
          <Tooltip
            key='charts2'
            title={t('AddCharts')}
            placement="right"
          >
            <div>
              <AiOutlineAppstoreAdd className='Chart-add-icon'
                onClick={() => setOpenNewChartDialog({ open: true, singleMode: false })}
              />
            </div>
          </Tooltip>}
      </Paper>
    </Grid>
  )
}

export default ChartEmpty