import React from 'react'
import { useTranslation } from 'react-i18next'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

const WidgetsFormActions = ({ setOpenWidgetsForm, handleSubmit, onSubmit }) => {
  const { t } = useTranslation()
  return (
    <DialogActions>
      <Button
        variant="text"
        size="medium"
        startIcon={<ClearOutlinedIcon />}
        onClick={() => setOpenWidgetsForm(false)}
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
        {t('Save')}
      </Button>
    </DialogActions>
  )
}

export default WidgetsFormActions
