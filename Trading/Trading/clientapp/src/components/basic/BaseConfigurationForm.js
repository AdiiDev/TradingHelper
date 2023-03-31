import TextField from '@mui/material/TextField'
import ReactHookFormSelect from '../common/ReactHookFormSelect'
import { useTranslation } from 'react-i18next'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'

const BaseConfigurationForm = ({ register, control }) => {
  const { t } = useTranslation()
  return (
    <Box component="form" autoComplete="off">
      <TextField
        {...register('username')}
        fullWidth
        className="Controller-text-field"
        label={t('Username')}
        autoFocus={true}
        required
      />
      <div className="Controller-text-field">
        <ReactHookFormSelect
          id="lang"
          name="language"
          label={t('Language')}
          control={control}
          defaultValue="pl"
        >
          <MenuItem value="pl">{t('Polish')}</MenuItem>
          <MenuItem value="en">{t('English')}</MenuItem>
        </ReactHookFormSelect>
      </div>
      <div className="Controller-text-field">
        <ReactHookFormSelect
          id="theme"
          name="theme"
          label={t('Theme')}
          control={control}
          defaultValue="dark"
        >
          <MenuItem value="light">{t('Light')}</MenuItem>
          <MenuItem value="dark">{t('Dark')}</MenuItem>
        </ReactHookFormSelect>
      </div>
      <TextField
        {...register('connectionString')}
        fullWidth
        label={t('ConnectionString')}
        className="Controller-text-field"
        defaultValue="connectionString"
        required
      />
    </Box>
  )
}

export default BaseConfigurationForm
