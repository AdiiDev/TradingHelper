import * as React from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined'
import CheckIcon from '@mui/icons-material/Check'
import WarningIcon from '@mui/icons-material/Warning'

const ConfirmDialog = ({ closeConfirmDialog, onConfirm }) => {
  const { t } = useTranslation()
  return (
    <Dialog
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogContent id="modal-modal-title" variant="h3" component="h2">
        {t('AreYouSureYouWantToDeleteIt')}
      </DialogContent>
      <WarningIcon fontSize="large" color="warning" className="confirm-icon" />
      <Button
        className="confirm-button"
        variant="outlined"
        startIcon={<CheckIcon />}
        size="large"
        color="success"
        onClick={() => onConfirm()}
      >
        {t('Confirm')}
      </Button>
      <Button
        className="confirm-button"
        variant="outlined"
        startIcon={<RemoveCircleOutlinedIcon />}
        size="medium"
        color="error"
        onClick={() => closeConfirmDialog()}
      >
        {t('Cancel')}
      </Button>
    </Dialog>
  )
}

export default ConfirmDialog
