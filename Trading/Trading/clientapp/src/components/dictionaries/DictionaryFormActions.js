import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { ConfirmDialog } from '../common/ConfirmDialog'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined'
import { setOpenDialog } from '../../services/DictionarySlice'

const DictionaryFormActions = ({ handleSubmit }) => {
  const { t } = useTranslation()
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false)
  const dispatch = useDispatch()

  return (
    <DialogActions>
      <Button
        className="delete-btn"
        variant="outlined"
        startIcon={<RemoveCircleOutlinedIcon />}
        size="medium"
        color="error"
        onClick={() => setOpenConfirmDialog(true)}
      >
        {t('Delete')}
      </Button>
      <Button
        variant="text"
        size="medium"
        startIcon={<ClearOutlinedIcon />}
        onClick={() => dispatch(setOpenDialog(false))}
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
          dispatch(setOpenDialog(false))
        }}
      >
        {t('Save')}
      </Button>
      {openConfirmDialog ? (
        <ConfirmDialog
          closeConfirmDialog={() => setOpenConfirmDialog(false)}
          onConfirm={() => console.log()}
        />
      ) : null}
    </DialogActions>
  )
}

export default DictionaryFormActions
