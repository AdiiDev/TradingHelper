import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Pagination from '../common/Pagination'
import ConfirmDialog from '../common/ConfirmDialog'
import SortedTableAddBar from './SortedTableAddBar'
import SortedTableHead from './SortedTableHead'
import SortedTableBody from './SortedTableBody'

const SortedTable = ({
  columns,
  onDelete,
  storedData,
  editDataTable,
  setOpenDialog,
}) => {
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
    const searchText = event.target.value.toLowerCase()
    setSearchText(searchText)

    const filteredData = storedData.filter((row) => {
      return (
        row.id.toString().includes(searchText) ||
        row.name?.toLowerCase().includes(searchText) ||
        row.brokerName?.toLowerCase().includes(searchText) ||
        row.symbol?.toLowerCase().includes(searchText)
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
      <SortedTableAddBar
        setOpenDialog={setOpenDialog}
        searchText={searchText}
        handleSearch={handleSearch}
      />
      <Table stickyHeader>
        <SortedTableHead
          columns={columns}
          handleSort={handleSort}
          sortInfo={sortInfo}
        />
        <SortedTableBody
          data={data}
          tableInfo={tableInfo}
          columns={columns}
          editDataTable={editDataTable}
          setOpenDialog={setOpenDialog}
          setRowID={setRowID}
          setOpenConfirmDialog={setOpenConfirmDialog}
        />
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
