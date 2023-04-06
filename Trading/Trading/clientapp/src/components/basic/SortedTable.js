import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setOpenDialog } from '../../services/dictionary/DictionarySlice'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Pagination from '../common/Pagination'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { ConfirmDialog } from '../common/ConfirmDialog'

const SortedTable = ({ columns, onDelete, storedData, editDataTable }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [tableInfo, setTableInfo] = useState({ page: 0, rowsPerPage: 5 })
  const [rowID, setRowID] = useState(null)
  const [data, setData] = useState(storedData)
  const [searchText, setSearchText] = useState('')
  const [sortInfo, setSortInfo] = useState({ column: null, direction: null })
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  useEffect(() => {
    setData(storedData)
  }, [storedData])

  const handleSearch = (event) => {
    const searchText = event.target.value
    setSearchText(searchText)

    const filteredData = storedData.filter((row) => {
      return (
        row.id.toString().includes(searchText) ||
        row.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.favourite.toString().includes(searchText)
      )
    })
    setData(filteredData)
  }

  const handleSort = (column) => {
    const direction =
      sortInfo.column === column && sortInfo.direction === 'asc'
        ? 'desc'
        : 'asc'

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === 'asc' ? -1 : 1
      }
      if (a[column] > b[column]) {
        return direction === 'asc' ? 1 : -1
      }
      return 0
    })

    setData(sortedData)
    setSortInfo({ column, direction })
  }

  const handleChangePage = (event, newPage) => {
    setTableInfo({ ...tableInfo, page: newPage })
    setSortInfo({ column: null, direction: null })
  }

  const handleChangeRowsPerPage = (event) => {
    setTableInfo({
      ...tableInfo,
      page: 0,
      rowsPerPage: +event.target.value,
    })
    setSortInfo({ column: null, direction: null })
  }

  return (
    <TableContainer component={Paper}>
      <Box className="search-container">
        {' '}
        <Button
          variant="filled"
          size="large"
          className="add-button"
          startIcon={<AddIcon />}
          onClick={() => dispatch(setOpenDialog(true))}
        >
          {t('Add')}
        </Button>
        <Box
          className="search-field"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <TextField
            size="small"
            variant="outlined"
            value={searchText}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                </InputAdornment>
              ),
            }}
            label={t('Search')}
            sx={{ width: '12vw' }}
          />
        </Box>
      </Box>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map(({ id, label, align }) => (
              <TableCell
                key={id}
                align={align}
                className="table-cell-header"
                style={{
                  minWidth: columns.minWidth,
                }}
                onClick={id !== 'actions' ? () => handleSort(id) : undefined}
              >
                {t(label)}
                {sortInfo.column === id &&
                  (sortInfo.direction === 'asc' ? (
                    <ArrowUpwardIcon className="arrow-icon" />
                  ) : (
                    <ArrowDownwardIcon className="arrow-icon" />
                  ))}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(
              tableInfo.page * tableInfo.rowsPerPage,
              tableInfo.page * tableInfo.rowsPerPage + tableInfo.rowsPerPage
            )
            .map((row) => {
              return (
                <TableRow
                  hover
                  key={'row' + row.id}
                  role="checkbox"
                  tabIndex={-1}
                  align="right"
                >
                  {(columns !== undefined ? columns : []).map((column) => {
                    if (column.id === 'actions') {
                      return null
                    }
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'favourite' ? (
                          row.favourite ? (
                            <Typography
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <StarIcon style={{ color: 'gold' }} />
                            </Typography>
                          ) : (
                            <Typography
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <StarBorderIcon style={{ color: 'gold' }} />
                            </Typography>
                          )
                        ) : (
                          value
                        )}
                      </TableCell>
                    )
                  })}
                  <TableCell key="actions" align="right">
                    <Button
                      className="action-btn"
                      variant="filled"
                      startIcon={<EditIcon />}
                      size="small"
                      onClick={() => {
                        editDataTable(row)
                        dispatch(setOpenDialog(true))
                      }}
                    >
                      {t('Edit')}
                    </Button>
                    <Button
                      className="action-btn"
                      variant="filled"
                      startIcon={<DeleteIcon />}
                      size="small"
                      onClick={() => {
                        setOpenConfirmDialog(true)
                        setRowID(row.id)
                      }}
                    >
                      {t('Delete')}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
      <Pagination
        count={data.length}
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

export default SortedTable
