import React from 'react'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

const DialogHeader = ({ title, closeDialog }) => {

  return (
    <DialogTitle className="dialog-form-title">
      {title}
      <span className="close-btn">
        <Button
          variant="text"
          size="medium"
          onClick={() => closeDialog()}
        >
          <ClearOutlinedIcon />
        </Button>
      </span>
    </DialogTitle>
  )
}

export default DialogHeader