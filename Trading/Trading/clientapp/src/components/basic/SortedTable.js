import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  Button,
} from '@mui/material'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { useTranslation } from 'react-i18next'
import { setOpenDialog } from '../../services/DictionarySlice'
import Pagination from '../common/Pagination'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const defaultData = [
  {
    id: 1,
    brokerName: 'John',
    accountNumber: 30,
    name: 'test',
    favourite: 'favourite',
  },
  {
    id: 2,
    brokerName: 'test',
    accountNumber: 30,
    name: 'test',
    favourite: 'favourite',
  },
  {
    id: 3,
    brokerName: 'Jtest',
    accountNumber: 30,
    name: 'test',
    favourite: 'favourite',
  },
]

const SortedTable = ({ columns }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [tableInfo, setTableInfo] = useState({ page: 0, rowsPerPage: 5 })
  const [data, setData] = useState(defaultData)
  const [orderBy, setOrderBy] = useState('')
  const [order, setOrder] = useState('asc')
  const [searchText, setSearchText] = useState('')
  const [filterLabel, setFilterLabel] = useState('')

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    setOrder(newOrder)
    setOrderBy(property)

    const sortedData = data.sort((a, b) => {
      const propertyA = a[orderBy]
      const propertyB = b[orderBy]
      if (propertyA < propertyB) {
        return order === 'asc' ? -1 : 1
      }
      if (propertyA > propertyB) {
        return order === 'asc' ? 1 : -1
      }
      return 0
    })

    setData(
      sortedData.filter(
        (row) => filterLabel === '' || row.label === filterLabel
      )
    )
  }

  const handleSearch = (event) => {
    const searchText = event.target.value
    setSearchText(searchText)

    const filteredData = defaultData.filter((row) => {
      return (
        (row.id.toString().includes(searchText) ||
          row.name.toLowerCase().includes(searchText.toLowerCase()) ||
          row.accountNumber.toString().includes(searchText)) &&
        (filterLabel === '' || row.label === filterLabel)
      )
    })

    setData(filteredData)
  }

  const handleChangePage = (event, newPage) => {
    setTableInfo({ ...tableInfo, page: newPage })
  }
  const handleChangeRowsPerPage = (event) => {
    setTableInfo({ ...tableInfo, page: 0, rowsPerPage: +event.target.value })
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
        <Box className="search-field">
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            label={t('Search')}
            size="small"
            variant="filled"
            value={searchText}
            onChange={handleSearch}
          />
        </Box>
      </Box>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {(columns !== undefined ? columns : []).map(
              ({ id, label, align }) => (
                <TableCell
                  key={id}
                  align={align}
                  sx={{
                    fontWeight: 'bolder',
                    fontSize: '1rem',
                  }}
                  style={{
                    minWidth: columns.minWidth,
                  }}
                >
                  <TableSortLabel
                    active={orderBy === label}
                    direction={order}
                    onClick={() => handleSort(label)}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
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
                      {value}
                    </TableCell>
                  )
                })}
                <TableCell key="actions" align="right">
                  <Button
                    className="action-btn"
                    variant="filled"
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => dispatch(setOpenDialog(true))}
                  >
                    {t('Edit')}
                  </Button>
                  <Button
                    className="action-btn"
                    variant="filled"
                    startIcon={<DeleteIcon />}
                    size="small"
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
    </TableContainer>
  )
}

export default SortedTable
