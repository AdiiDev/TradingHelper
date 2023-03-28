import React, { useState } from 'react'
import Typography from '@mui/material/Typography'

export const PageTitle = ({ title }) => {
  return (
    <Typography
      variant="h3"
      className="Page-title"
      sx={{ color: 'primary.main' }}
    >
      {title}
    </Typography>
  )
}
