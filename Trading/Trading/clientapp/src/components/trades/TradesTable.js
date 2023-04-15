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
  const [trades, setTrades] = useState([
    {
      tradingPairs: 'id: 1, symbol: 102',
      tradeConsistentStrategy: true,
      startTrade: '2023/14/04',
      endTrade: '2023/14/04',
      profitLoos: -10,
      confirmations: "id: 1, name: 'test'",
    },
  ])
  const [tableInfo, setTableInfo] = useState({ page: 0, rowsPerPage: 5 })
  const [count, setCount] = useState(0)
  const [reload, setReload] = useState(0)
  const [rowID, setRowID] = useState(null)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const clearTimeoutRef = useRef()

  const loadTrades = async () => {
    const res = await TradesService.GetTrades({
      Filter: filter,
      Page: tableInfo.page,
      PageSize: tableInfo.rowsPerPage,
    })
    if (res.isError) {
      toast.error(t('LoadingError'))
      return
    }
    console.log(res)
    //setTrades(res.result.trades)
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
  }, [tableInfo.page, tableInfo.rowsPerPage, reload, filter])

  useEffect(() => {
    setTableInfo({ ...tableInfo, page: 0 })
  }, [filter])

  const handleChangePage = (event, newPage) => {
    setTableInfo({ ...tableInfo, page: newPage })
  }
  const handleChangeRowsPerPage = (event) => {
    setTableInfo({ ...tableInfo, page: 0, rowsPerPage: +event.target.value })
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
        rowsPerPage={tableInfo.rowsPerPage}
        page={tableInfo.page}
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
