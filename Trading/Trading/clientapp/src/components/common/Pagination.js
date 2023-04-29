import React from 'react'
import { useTranslation } from 'react-i18next'
import TablePagination from '@mui/material/TablePagination'

const Pagination = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const { t } = useTranslation()
  return (
    <TablePagination
      rowsPerPageOptions={[5, 8, 10, 20]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage={t('RowsPerPage')}
      labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} ${t('Of')} ${count !== -1 ? count : `more than ${to}`}`
      }
    />
  )
}

export default Pagination
