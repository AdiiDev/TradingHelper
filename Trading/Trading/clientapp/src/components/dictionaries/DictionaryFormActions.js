import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { setOpenDialog } from '../../services/dictionary/DictionarySlice'

const DictionaryFormActions = ({ handleSubmit }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <DialogActions className="dialog-form-actions">
      <Button
        variant="text"
        size="medium"
        startIcon={<ClearOutlinedIcon />}
        onClick={() => {
          dispatch(setOpenDialog(false))
        }}
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
