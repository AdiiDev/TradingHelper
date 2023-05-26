import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import moment from 'moment'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterList'
import TradesService from '../../services/TradesService'
import Pagination from '../common/Pagination'
import ConfirmDialog from '../common/ConfirmDialog'
import TradesTablePopover from './TradesTablePopover'
import TradesTableBody from './TradesTableBody'
import TradesTableHead from './TradesTableHead'
import { tradesColumns } from '../../data'

const TradesTable = ({
  editDataTable,
  onDelete,
  setOpenDialog,
  filter,
  toggleDrawer,
  reload,
}) => {
  const { t } = useTranslation()
  const [trades, setTrades] = useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(8)
  const [count, setCount] = useState(0)
  const [rowID, setRowID] = useState(null)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState({
    tradingPairs: true,
    tradeConsistentStrategy: true,
    startTrade: true,
    endTrade: true,
    profitLoss: true,
    confirmations: true,
  })
  const [showAllColumns, setShowAllColumns] = useState(true)
  const [columnWidths, setColumnWidths] = useState({})
  const [columns, setColumns] = useState(tradesColumns)

  const clearTimeoutRef = useRef()

  const fixProfitOrLoss = (data) => {
    if (data === null || data === '') return null
    return +data
  }

  const loadTrades = async () => {
    const lossNew = fixProfitOrLoss(filter.loss)
    const profitNew = fixProfitOrLoss(filter.profit)
    const confirmationsArray = filter.confirmations.map(
      (confirmation) => confirmation.id
    )
    const filterData = {
      brokerId: filter.brokerId,
      tradingPairId: filter.tradingPairId,
      dateFrom: moment(filter.dateFrom).utc(),
      dateTo: moment(filter.dateTo).utc(),
      tradeConsistentStrategy: filter.tradeConsistentStrategy,
      numberOfConfirmations:
        filter.numberOfConfirmations !== 0
          ? +filter.numberOfConfirmations
          : null,
      confirmations: confirmationsArray,
      profit: profitNew,
      loss: lossNew,
      onlyProfit: filter.onlyProfit,
      onlyLoss: filter.onlyLoss,
      Page: page,
      PageSize: rowsPerPage,
    }
    console.log(filterData)
    const res = await TradesService.GetTrades(filterData)
    if (res.isError) {
      toast.error(t('LoadingError'))
      return
    }
    setTrades(res.result.trades)
    setCount(res.result.count)
    toast.success(t('Updated'))
  }

  useEffect(() => {
    const loadData = async () => {
      if (clearTimeoutRef.current !== null)
        clearTimeout(clearTimeoutRef.current)
      clearTimeoutRef.current = setTimeout(() => {
        loadTrades(false)
        clearTimeoutRef.current = null
      }, 1000)
    }
    loadData()
  }, [page, rowsPerPage, reload, filter])

  useEffect(() => {
    setPage(0)
  }, [filter])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const toggleColumnVisibility = (columnId) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnId]: !prevVisibility[columnId],
    }))
  }

  const handleShowAllColumns = () => {
    setShowAllColumns(!showAllColumns)
    setColumnVisibility((prevVisibility) => {
      const updatedVisibility = { ...prevVisibility }
      for (const columnId in updatedVisibility) {
        updatedVisibility[columnId] = showAllColumns
      }
      return updatedVisibility
    })
  }

  const handleColumnWidthChange = (columnId, newValue) => {
    setColumnWidths((prevWidths) => ({
      ...prevWidths,
      [columnId]: newValue,
    }))
  }

  const moveColumnUp = (index) => {
    if (index === 0) return
    const updatedColumns = Array.from(columns)
    const column = updatedColumns.splice(index, 1)[0]
    updatedColumns.splice(index - 1, 0, column)
    setColumns(updatedColumns)
    updateColumnIndexes(updatedColumns)
  }

  const moveColumnDown = (index) => {
    if (index === columns.length - 1) return
    const updatedColumns = Array.from(columns)
    const column = updatedColumns.splice(index, 1)[0]
    updatedColumns.splice(index + 1, 0, column)
    setColumns(updatedColumns)
    updateColumnIndexes(updatedColumns)
  }

  const updateColumnIndexes = (updatedColumns) => {
    const updatedTradesColumns = updatedColumns.map((column, index) => ({
      ...column,
      index: index + 1,
    }))
    setColumns(updatedTradesColumns)
  }

  return (
    <TableContainer component={Paper}>
      <Box className="search-container">
        <Button
          variant="filled"
          size="large"
          className="add-button"
          startIcon={<AddIcon />}
          onClick={() => {
            setOpenDialog(true)
            editDataTable(null)
          }}
        >
          {t('Add')}
        </Button>
        <TradesTablePopover
          moveColumnDown={moveColumnDown}
          moveColumnUp={moveColumnUp}
          toggleColumnVisibility={toggleColumnVisibility}
          handleColumnWidthChange={handleColumnWidthChange}
          handleShowAllColumns={handleShowAllColumns}
          columnWidths={columnWidths}
          columns={columns}
          columnVisibility={columnVisibility}
          showAllColumns={showAllColumns}
        />
        <div className="button-drawerOpen">
          <Tooltip title={t('OpenDrawer')}>
            <Button onClick={toggleDrawer}>
              <FilterListIcon fontSize="large" />
            </Button>
          </Tooltip>
        </div>
      </Box>
      <Table stickyHeader>
        <TradesTableHead
          columns={columns}
          columnVisibility={columnVisibility}
          columnWidths={columnWidths}
        />
        <TradesTableBody
          columns={columns}
          columnWidths={columnWidths}
          columnVisibility={columnVisibility}
          editDataTable={editDataTable}
          setOpenDialog={setOpenDialog}
          setOpenConfirmDialog={setOpenConfirmDialog}
          setRowID={setRowID}
          trades={trades}
        />
      </Table>
      <Pagination
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {openConfirmDialog ? (
        <ConfirmDialog
          closeConfirmDialog={() => setOpenConfirmDialog(false)}
          onConfirm={() => {
            onDelete(rowID)
            setOpenConfirmDialog(false)
          }}
        />
      ) : null}
    </TableContainer>
  )
}

export default TradesTable
