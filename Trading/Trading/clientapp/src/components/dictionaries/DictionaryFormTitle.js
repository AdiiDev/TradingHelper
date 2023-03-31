import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@mui/material'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { setOpenDialog } from '../../services/DictionarySlice'

const DictionaryFormTitle = ({ title }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <DialogTitle className="dialog-form-title">
      {t(title)}
      <span className="close-btn">
        <Button
          variant="text"
          size="medium"
          onClick={() => dispatch(setOpenDialog(false))}
        >
          <ClearOutlinedIcon />
        </Button>
      </span>
    </DialogTitle>
  )
}

export default DictionaryFormTitle
