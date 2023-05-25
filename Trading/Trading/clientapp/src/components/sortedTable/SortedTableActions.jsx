import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
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
  const confirmationsData = useSelector(
    (state) => state.confirmations.confirmations
  )

  const handleEditData = (data) => {
    if (data.confirmations?.length > 0) {
      const matchConfirmations = confirmationsData.filter((confirm) =>
        data.confirmations?.includes(confirm.id)
      )
      editDataTable({ ...data, confirmations: matchConfirmations })
      setOpenDialog(true)
    } else {
      editDataTable(data)
      setOpenDialog(true)
    }
  }

  return (
    <TableCell key={columnName} align="right">
      <Button
        className="action-btn"
        variant="filled"
        startIcon={<EditIcon />}
        size="small"
        onClick={() => {
          handleEditData(row)
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
