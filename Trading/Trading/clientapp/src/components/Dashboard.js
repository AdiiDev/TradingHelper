import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { CardHeader, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Brightness1Icon from '@mui/icons-material/Brightness1'
import Link from '@mui/material/Link'

const Dashboard = ({ user }) => {
  const { t } = useTranslation()
  const [quotes, setQuotes] = useState({})

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        const quoteObject = await axios.get('https://api.quotable.io/random')
        setQuotes(quoteObject.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRandomQuote()
  }, [])

  return (
    <Paper className="paperTab">
      <Card>
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          {t('Welcome')} {user}
        </Typography>
        <Divider>
          <Brightness1Icon />
        </Divider>
        <CardHeader
          className="card-header"
          title={t('YourQuoteForToday')}
          variant="h5"
        />
        <CardContent className="card-content">
          <Typography gutterBottom variant="h5" component="div" align="center">
            {quotes.author}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            "{quotes.content}"
          </Typography>
          <Divider>
            <Brightness1Icon />
          </Divider>
          <CardHeader
            className="card-header"
            title={t('WhatYouWantToDo')}
            variant="h5"
          />
          <List component="nav" aria-label="mailbox folders">
            <Link variant="h5" href="/clientPage">
              {t('AddAClient')}
            </Link>
            <Divider>
              <Brightness1Icon />
            </Divider>
            <Link variant="h5" href="/portraitPage">
              {t('AddAPortrait')}
            </Link>
            <Divider>
              <Brightness1Icon />
            </Divider>
            <Link variant="h5" href="/dictionaresPage">
              {t('AddALetterOrName')}
            </Link>
            <Divider>
              <Brightness1Icon />
            </Divider>
            <Link variant="h5" href="/calendarPage">
              {t('CompleteTheCalendar')}
            </Link>
            <Divider>
              <Brightness1Icon />
            </Divider>
          </List>
        </CardContent>
      </Card>
    </Paper>
  )
}

export default Dashboard
