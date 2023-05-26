import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

const SortedTableAddBar = ({
  setOpenDialog,
  searchText,
  handleSearch,
  setEditDataTable,
}) => {
  const { t } = useTranslation()

  return (
    <Box className="search-container">
      {' '}
      <Button
        variant="filled"
        size="large"
        className="add-button"
        startIcon={<AddIcon />}
        onClick={() => {
          setOpenDialog(true)
          setEditDataTable(null)
        }}
      >
        {t('Add')}
      </Button>
      <Box className="search-field">
        <TextField
          size="small"
          variant="outlined"
          className="search-input"
          value={searchText}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="search-icon" />
              </InputAdornment>
            ),
          }}
          label={t('Search')}
        />
      </Box>
    </Box>
  )
}

export default SortedTableAddBar
