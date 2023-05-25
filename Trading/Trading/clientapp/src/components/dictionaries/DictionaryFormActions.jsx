import React from 'react'
import { useTranslation } from 'react-i18next'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

const DictionaryFormActions = ({ handleSubmit, setOpenDialog }) => {
  const { t } = useTranslation()

  return (
    <DialogActions>
      <Button
        variant="text"
        size="medium"
        startIcon={<ClearOutlinedIcon />}
        onClick={() => setOpenDialog(false)}
      >
        {t('Cancel')}
      </Button>
      <Button
        variant="contained"
        className="dialog-form-btn"
        startIcon={<AddOutlinedIcon />}
        size="medium"
        type="submit"
        onClick={() => {
          handleSubmit()
        }}
      >
        {t('Save')}
      </Button>
    </DialogActions>
  )
}

export default DictionaryFormActions
