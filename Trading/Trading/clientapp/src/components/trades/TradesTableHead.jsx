import React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { useTranslation } from 'react-i18next'

const TradesTableHead = ({ columns, columnVisibility, columnWidths }) => {
  const { t } = useTranslation()
  return (
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
  )
}

export default TradesTableHead
