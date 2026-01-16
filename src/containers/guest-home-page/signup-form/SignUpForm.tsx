import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { Link as RouterLink } from 'react-router-dom'
import type { ChangeEvent, FormEvent } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import { styles } from '~/containers/guest-home-page/signup-form/SignUpForm.styles'

interface SignUpFormProps {
  handleSubmit: (event?: FormEvent<HTMLFormElement>) => void
  handleChange: (
    field: string
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  data: { [key: string]: string }
  errors: { [key: string]: string }
}

const SignUpForm = ({
  handleSubmit,
  handleChange,
  data,
  errors
}: SignUpFormProps) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)

  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  const { privacyPolicy, termOfUse } = guestRoutes
  const { t } = useTranslation()

  const checkboxText = (
    <Box sx={styles.label}>
      <Typography variant='body2'>{t('signup.iAgree')}</Typography>
      <Typography
        component={RouterLink}
        sx={styles.underlineText}
        to={termOfUse.path}
        variant='body2'
      >
        {t('common.labels.terms')}
      </Typography>
      <Typography variant='body2'>{t('signup.and')}</Typography>
      <Typography
        component={RouterLink}
        sx={styles.underlineText}
        to={privacyPolicy.path}
        variant='body2'
      >
        {t('common.labels.privacyPolicy')}
      </Typography>
    </Box>
  )

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.userName}>
        <AppTextField
          data-testid={'firstName'}
          errorMsg={t(errors.firstName)}
          fullWidth
          label={t('common.labels.firstName')}
          onChange={handleChange('firstName')}
          required
          size='medium'
          type='text'
          value={data.firstName}
        />

        <AppTextField
          data-testid={'lastName'}
          errorMsg={t(errors.lastName)}
          fullWidth
          label={t('common.labels.lastName')}
          onChange={handleChange('lastName')}
          required
          size='medium'
          type='text'
          value={data.lastName}
        />
      </Box>

      <AppTextField
        data-testid={'email'}
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onChange={handleChange('email')}
        required
        size='medium'
        sx={{ mb: '5px' }}
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onChange={handleChange('password')}
        required
        sx={{ mb: '5px' }}
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />

      <FormControlLabel
        control={<Checkbox name='checkboxText' />}
        label={checkboxText}
        sx={{ mb: '23px' }}
      />

      <AppButton disabled sx={styles.signupButton} type='submit'>
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignUpForm
