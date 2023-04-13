import React from 'react'
import { useTranslation } from 'react-i18next'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

const DictionaryFormTitle = ({ title, setOpenDialog }) => {
  const { t } = useTranslation()

  return (
    <DialogTitle className="dialog-form-title">
      {t(title)}
      <span className="close-btn">
        <Button
          variant="text"
          size="medium"
          onClick={() => setOpenDialog(false)}
        >
          <ClearOutlinedIcon />
        </Button>
      </span>
    </DialogTitle>
  )
}

export default DictionaryFormTitle
