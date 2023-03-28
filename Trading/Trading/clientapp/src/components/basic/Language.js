import React, { useState, useEffect } from 'react'
import Flag from 'react-world-flags'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export const Language = () => {
  const language = useSelector((state) => state.config.language)
  const [lang, setLang] = useState(language)
  const { t, i18n } = useTranslation()

  // Language is not changing
  const changeLang = () => {
    const newLang = lang === 'en' ? 'pl' : 'en'
    setLang(newLang)
    i18n.changeLanguage(newLang)
  }

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return (
    <ListItemButton
      sx={{
        minHeight: 40,
        justifyContent: true ? 'initial' : 'center',
        px: 2.5,
      }}
      onClick={() => changeLang()}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          justifyContent: 'center',
        }}
      >
        {lang === 'en' ? (
          <Flag code="sh" height={24} width={24} />
        ) : (
          <Flag code="pl" height={24} width={24} />
        )}
      </ListItemIcon>
    </ListItemButton>
  )
}
