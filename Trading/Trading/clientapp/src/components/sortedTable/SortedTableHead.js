import React from 'react'
import { useTranslation } from 'react-i18next'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const SortedTableHead = ({ columns, handleSort, sortInfo }) => {
  const { t } = useTranslation()

  return (
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
  )
}

export default SortedTableHead
