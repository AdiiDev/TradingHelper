import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import WarningIcon from '@mui/icons-material/Warning'
import FilterListIcon from '@mui/icons-material/FilterList'
import TradesService from '../../services/TradesService'
import Pagination from '../common/Pagination'
import ConfirmDialog from '../common/ConfirmDialog'
import SortedTableActions from '../sortedTable/SortedTableActions'
import { tradesColumns } from '../../data'

const TradesTable = ({
  editDataTable,
  onDelete,
  setOpenDialog,
  filter,
  toggleDrawer,
}) => {
  const { t } = useTranslation()
  const [trades, setTrades] = useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(8)
  const [count, setCount] = useState(0)
  const [reload, setReload] = useState(0)
  const [rowID, setRowID] = useState(null)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const clearTimeoutRef = useRef()

  const fixProfitOrLoos = (data) => {
    if (data === null || data === '') return null
    return +data
  }

  const loadTrades = async () => {
    debugger
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
    console.log(res)
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
            {tradesColumns.map(({ id, label, align }) => (
              <TableCell
                key={id}
                align={align}
                className="table-cell-header"
                style={{
                  minWidth: tradesColumns.minWidth,
                }}
              >
                {t(label)}
              </TableCell>
            ))}
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
                {tradesColumns.map((column) => {
                  if (column.id === 'actions') {
                    return null
                  }
                  const value = row[column.id]
                  const cellStyle =
                    column.id === 'profitLoos'
                      ? value > 0
                        ? { color: 'green' }
                        : value < 0
                        ? { color: 'red' }
                        : { color: 'yellow' }
                      : {}

                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={cellStyle}
                    >
                      {column.id === 'tradeConsistentStrategy' ? (
                        row.tradeConsistentStrategy ? (
                          <Typography className="check-table">
                            <CheckIcon fontSize="large" />
                          </Typography>
                        ) : (
                          <WarningIcon className="warning-table" />
                        )
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
