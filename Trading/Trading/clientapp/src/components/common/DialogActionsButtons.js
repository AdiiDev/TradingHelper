import React from 'react'
import { useTranslation } from 'react-i18next'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

const DialogActionsButtons = ({ close, handleSubmit, saveTitle, onSubmit }) => {
  const { t } = useTranslation()

  return (
    <DialogActions>
      <Button
        variant="text"
        size="medium"
        startIcon={<ClearOutlinedIcon />}
        onClick={() => close()}
      >
        {t('Cancel')}
      </Button>
      <Button
        variant="contained"
        className="dialog-form-btn"
        startIcon={<AddOutlinedIcon />}
        size="medium"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        {saveTitle ? t(saveTitle) : t('Save')}
      </Button>
    </DialogActions>
  )
}

export default DialogActionsButtons