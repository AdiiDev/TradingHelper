import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Brightness1Icon from '@mui/icons-material/Brightness1'

const Dashboard = () => {
  const { t } = useTranslation()
  const userData = useSelector((state) => state.config)

  return (
    <Paper className="paperTab">
      <Typography variant="h4" sx={{ color: 'primary.main' }}>
        {t('Welcome')} {userData.username}
      </Typography>
      <Divider>
        <Brightness1Icon />
      </Divider>
    </Paper>
  )
}

export default Dashboard
