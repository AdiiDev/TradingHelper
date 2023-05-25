import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import ReactHookFormSelect from '../common/ReactHookFormSelect'

const BaseConfigurationForm = ({ register, control }) => {
  const { t } = useTranslation()

  return (
    <Stack spacing={3}>
      <TextField
        {...register('username')}
        fullWidth
        className="Controller-text-field"
        label={t('Username')}
        autoFocus={true}
        required
      />
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
      <TextField
        {...register('connectionString')}
        fullWidth
        label={t('ConnectionString')}
        className="Controller-text-field"
        defaultValue="connectionString"
        required
      />
      <ReactHookFormSelect
        id="DBEngine"
        name="DBEngine"
        label={t('DatabaseEngine')}
        control={control}
        defaultValue="MSSQL"
      >
        <MenuItem value="MSSQL">{'MSSQL'}</MenuItem>
        <MenuItem value="MySQL">{'MySQL'}</MenuItem>
      </ReactHookFormSelect>
    </Stack>
  )
}

export default BaseConfigurationForm
