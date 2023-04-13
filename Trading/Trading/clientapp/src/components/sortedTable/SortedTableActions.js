import React from 'react'
import { useTranslation } from 'react-i18next'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const SortedTableActions = ({
  columnName,
  editDataTable,
  setOpenDialog,
  setOpenConfirmDialog,
  setRowID,
  row,
}) => {
  const { t } = useTranslation()
  return (
    <TableCell key={columnName} align="right">
      <Button
        className="action-btn"
        variant="filled"
        startIcon={<EditIcon />}
        size="small"
        onClick={() => {
          editDataTable(row)
          setOpenDialog(true)
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
  )
}

export default SortedTableActions
