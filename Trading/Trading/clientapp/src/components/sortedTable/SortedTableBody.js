import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star'
import SortedTableActions from './SortedTableActions'

const SortedTableBody = ({
  data,
  tableInfo,
  columns,
  editDataTable,
  setOpenDialog,
  setRowID,
  setOpenConfirmDialog,
}) => {
  return (
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
  )
}

export default SortedTableBody
