import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Popover from '@mui/material/Popover'
import Divider from '@mui/material/Divider'
import Slider from '@mui/material/Slider'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import FilterListIcon from '@mui/icons-material/FilterList'
import TradesService from '../../services/TradesService'
import Pagination from '../common/Pagination'
import ConfirmDialog from '../common/ConfirmDialog'
import SortedTableActions from '../sortedTable/SortedTableActions'
import { tradesColumns } from '../../data'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

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
  const [openSettingsPopover, setOpenSettingsPopover] = useState(false)
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
  const anchorRef = useRef(null)
  const clearTimeoutRef = useRef()

  const fixProfitOrLoos = (data) => {
    if (data === null || data === '') return null
    return +data
  }

  const loadTrades = async () => {
    const loosNew = fixProfitOrLoos(filter.loos)
    const profitNew = fixProfitOrLoos(filter.profit)
    const res = await TradesService.GetTrades({
      brokerId: filter.brokerId,
      tradingPairs: filter.tradingPairs,
      dateFrom: filter.dateFrom,
      dateTime: filter.dateTime,
      tradeConsistentStrategy: filter.tradeConsistentStrategy,
      numberOfConfirmations:
        filter.numberOfConfirmations !== ''
          ? +filter.numberOfConfirmations
          : null,
      confirmations: filter.confirmations,
      profit: profitNew,
      loos: loosNew,
      onlyProfit: filter.onlyProfit,
      onlyLoos: filter.onlyLoos,
      Page: page,
      PageSize: rowsPerPage,
    })
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
          onClick={() => setOpenDialog(true)}
        >
          {t('Add')}
        </Button>{' '}
        <div style={{ marginRight: '50px' }} className="button-drawerOpen">
          <Tooltip title={t('TableSettings')}>
            <Button
              onClick={() => setOpenSettingsPopover(true)}
              ref={anchorRef}
            >
              <MoreVertIcon fontSize="large" />
            </Button>
          </Tooltip>
          <Popover
            open={openSettingsPopover}
            onClose={() => setOpenSettingsPopover(false)}
            anchorEl={anchorRef.current}
          >
            <Box sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                {t('TableSettings')}
              </Typography>
              {columns.map((column, index) => (
                <div key={column.id}>
                  {column.id === 'actions' ? null : (
                    <>
                      <Button onClick={() => moveColumnUp(index)}>
                        <KeyboardArrowUpIcon />
                      </Button>
                      <Button onClick={() => moveColumnDown(index)}>
                        <ArrowDropDownIcon />
                      </Button>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={columnVisibility[column.id]}
                            onChange={() => toggleColumnVisibility(column.id)}
                          />
                        }
                        label={t(column.label)}
                      />
                    </>
                  )}
                  {column.id === 'actions' ? null : (
                    <>
                      {' '}
                      <Typography
                        id={`slider-label-${column.id}`}
                        variant="caption"
                      >
                        {`${t('ColumnWidth')}: ${
                          columnWidths[column.id] || 100
                        }px`}{' '}
                      </Typography>
                      <Slider
                        sx={{ marginLeft: '10px' }}
                        color="secondary"
                        value={columnWidths[column.id] || 200}
                        min={100}
                        max={500}
                        step={10}
                        onChange={(event, newValue) =>
                          handleColumnWidthChange(column.id, newValue)
                        }
                        aria-labelledby={`slider-label-${column.id}`}
                      />
                      <Divider />
                    </>
                  )}
                </div>
              ))}
              <FormControlLabel
                control={
                  <Switch
                    checked={showAllColumns}
                    onChange={handleShowAllColumns}
                  />
                }
                label={showAllColumns ? t('HideAll') : t('ShowAll')}
              />
            </Box>
          </Popover>
        </div>
        <div className="button-drawerOpen">
          <Tooltip title={t('OpenDrawer')}>
            <Button onClick={toggleDrawer}>
              <FilterListIcon fontSize="large" />
            </Button>
          </Tooltip>
        </div>
      </Box>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              if (column.id === 'actions') {
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="table-cell-header-"
                  >
                    {t(column.label)}
                  </TableCell>
                )
              }

              const isColumnVisible = columnVisibility[column.id]
              const columnWidth = columnWidths[column.id] || 200

              return (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className={`table-cell-header-${
                    !isColumnVisible ? 'hidden' : ''
                  }`}
                  style={{ width: columnWidth }}
                >
                  {t(column.label)}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((row) => {
            return (
              <TableRow
                hover
                key={'row' + row.id}
                role="checkbox"
                tabIndex={-1}
                align="right"
              >
                {columns.map((column) => {
                  if (!columnVisibility[column.id]) {
                    return null
                  }
                  let value = row[column.id]
                  if (column.id === 'tradingPairs') {
                    value = row.tradingPairId
                  } else if (column.id === 'confirmations') {
                    value = row.confirmations.join(', ')
                  } else if (column.id === 'startTrade') {
                    value = row.startTrade.replace('T', ' ')
                  } else if (column.id === 'endTrade') {
                    value = row.endTrade?.replace('T', ' ')
                  }
                  const cellStyle =
                    column.id === 'profitLoss'
                      ? value > 0
                        ? { color: 'green', fontWeight: 'bolder' }
                        : value < 0
                        ? { color: 'red', fontWeight: 'bolder' }
                        : { color: 'yellow', fontWeight: 'bolder' }
                      : {}

                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ ...cellStyle, width: columnWidths[column.id] }}
                      className={
                        columnVisibility[column.id] ? '' : 'hidden-column'
                      }
                    >
                      {column.id === 'tradeConsistentStrategy' ? (
                        row.tradeConsistentStrategy ? (
                          <Typography className="check-table">
                            <CheckIcon fontSize="large" />
                          </Typography>
                        ) : null
                      ) : (
                        value
                      )}
                    </TableCell>
                  )
                })}
                <SortedTableActions
                  columnName={'actions'}
                  editDataTable={editDataTable}
                  setOpenDialog={setOpenDialog}
                  setOpenConfirmDialog={setOpenConfirmDialog}
                  setRowID={setRowID}
                  row={row}
                />
              </TableRow>
            )
          })}
        </TableBody>
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
