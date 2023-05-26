import React from 'react'
import { useSelector } from 'react-redux'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'
import SortedTableActions from '../sortedTable/SortedTableActions'

const TradesTableBody = ({
  columns,
  columnVisibility,
  columnWidths,
  editDataTable,
  setOpenDialog,
  setOpenConfirmDialog,
  setRowID,
  trades,
}) => {
  const tradingPairsData = useSelector(
    (state) => state.tradingPairs.tradingPairs
  )
  const confirmationsData = useSelector(
    (state) => state.confirmations.confirmations
  )
  return (
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
                const matchingPair = tradingPairsData.find(
                  (pair) => pair.id === row.tradingPairId
                )
                value = matchingPair.symbol
              } else if (column.id === 'confirmations') {
                const matchConfirmations = confirmationsData.filter((confirm) =>
                  row.confirmations.includes(confirm.id)
                )
                value = matchConfirmations.map((match) => match.name).join(', ')
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
                  className={columnVisibility[column.id] ? '' : 'hidden-column'}
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
  )
}

export default TradesTableBody
