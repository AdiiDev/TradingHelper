import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

const WidgetsFormTitle = ({ setOpenWidgetsForm }) => {
  const { t } = useTranslation()
  return (
    <DialogTitle className="dialog-form-title">
      {t('View')}
      <span className="close-btn">
        <Button
          variant="text"
          size="medium"
          onClick={() => setOpenWidgetsForm(false)}
        >
          <ClearOutlinedIcon />
        </Button>
      </span>
    </DialogTitle>
  )
}

export default WidgetsFormTitle
