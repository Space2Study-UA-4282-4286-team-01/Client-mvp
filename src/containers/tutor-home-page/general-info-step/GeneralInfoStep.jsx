/* eslint-disable react/jsx-max-depth */
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'

import notebookImg from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { useStepContext } from '~/context/step-context'
import { tutorStepLabels } from '~/components/user-steps-wrapper/constants'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const MOCK_LOCATIONS = {
  Ukraine: [
    'Kyiv',
    'Lviv',
    'Kharkiv',
    'Odesa',
    'Dnipro',
    'Zaporizhzhia',
    'Vinnytsia',
    'Poltava',
    'Chernihiv',
    'Cherkasy',
    'Sumy',
    'Rivne'
  ],
  Poland: ['Warsaw', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk', 'Lublin'],
  Switzerland: ['Bern', 'Zurich', 'Geneva', 'Basel', 'Lausanne', 'Lucerne'],
  Spain: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga'],
  France: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes'],
  USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
  Germany: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt']
}

const GeneralInfoStep = ({ btnsBox, isStudent = false }) => {
  const { t } = useTranslation(['becomeTutor', 'common'])
  const { stepData, handleStepData } = useStepContext()

  const stepLabel = tutorStepLabels[0]
  const { data, errors } = stepData[stepLabel] || { data: {}, errors: {} }

  const getValidationError = (name, value) => {
    if (name === 'isAgeConfirmed' && isStudent) {
      return value ? null : 'common:errorMessages.ageConfirmation'
    }
    if (
      name === 'country' ||
      name === 'city' ||
      name === 'professionalSummary'
    ) {
      return null
    }
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'common:errorMessages.emptyField'
    }
    if (name === 'firstName' || name === 'lastName') {
      if (value.length > 30) return 'common:errorMessages.nameLength'
      if (!/^[a-zA-Z\s]*$/.test(value))
        return 'common:errorMessages.nameAlphabeticOnly'
    }
    return null
  }

  const handleTextChange = (event) => {
    const { name, value } = event.target
    const regex = /^[a-zA-Z\s]*$/

    if (value.length <= 30 && regex.test(value)) {
      const error = getValidationError(name, value)
      const newErrors = { ...errors, [name]: error }
      if (!error) delete newErrors[name]
      handleStepData(stepLabel, { ...data, [name]: value }, newErrors)
    }
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    const trimmedValue = value.trim()
    const error = getValidationError(name, trimmedValue)
    const newErrors = { ...errors, [name]: error }
    if (!error) delete newErrors[name]
    handleStepData(stepLabel, { ...data, [name]: trimmedValue }, newErrors)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    const error = getValidationError(name, value)
    const newErrors = { ...errors, [name]: error }
    if (!error) delete newErrors[name]
    handleStepData(stepLabel, { ...data, [name]: value }, newErrors)
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    const error = getValidationError(name, checked)
    const newErrors = { ...errors, [name]: error }
    if (!error) delete newErrors[name]
    handleStepData(stepLabel, { ...data, [name]: checked }, newErrors)
  }

  const handleCountryChange = (_, newValue) => {
    const value = newValue || ''
    const newErrors = { ...errors }
    delete newErrors.country
    handleStepData(stepLabel, { ...data, country: value, city: '' }, newErrors)
  }

  const handleCityChange = (_, newValue) => {
    const value = newValue || ''
    const newErrors = { ...errors }
    delete newErrors.city
    handleStepData(stepLabel, { ...data, city: value }, newErrors)
  }

  const citiesOptions = data.country ? MOCK_LOCATIONS[data.country] || [] : []

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <img
          alt='Student illustration'
          src={
            notebookImg ||
            'https://ouch-cdn2.icons8.com/rN-3Qz3yV3k_y6i3r4vH5_3J5v8_2.png'
          }
        />
      </Box>

      <Box sx={styles.contentBox}>
        <Typography sx={styles.title}>
          {t('becomeTutor:generalInfo.title')}
        </Typography>

        <Box autoComplete='off' component='form' sx={styles.form}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                autoFocus
                error={Boolean(errors.firstName)}
                fullWidth
                helperText={errors.firstName ? t(errors.firstName) : ''}
                label={t('common:labels.firstName')}
                name='firstName'
                onBlur={handleBlur}
                onChange={handleTextChange}
                required
                size='small'
                value={data.firstName || ''}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                error={Boolean(errors.lastName)}
                fullWidth
                helperText={errors.lastName ? t(errors.lastName) : ''}
                label={t('common:labels.lastName')}
                name='lastName'
                onBlur={handleBlur}
                onChange={handleTextChange}
                required
                size='small'
                value={data.lastName || ''}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <Autocomplete
                onChange={handleCountryChange}
                options={Object.keys(MOCK_LOCATIONS)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(errors.country)}
                    fullWidth
                    helperText={errors.country ? t(errors.country) : ''}
                    label={t('common:labels.country')}
                  />
                )}
                size='small'
                value={data.country || null}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <Autocomplete
                disabled={!data.country}
                noOptionsText={
                  data.country ? 'No cities found' : 'Select a country first'
                }
                onChange={handleCityChange}
                options={citiesOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(errors.city)}
                    fullWidth
                    helperText={errors.city ? t(errors.city) : ''}
                    label={t('common:labels.city')}
                  />
                )}
                size='small'
                value={data.city || null}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={Boolean(errors.professionalSummary)}
                fullWidth
                helperText={
                  errors.professionalSummary
                    ? t(errors.professionalSummary)
                    : ''
                }
                inputProps={{ maxLength: 100 }}
                label={t('becomeTutor:generalInfo.textFieldLabel')}
                multiline
                name='professionalSummary'
                onBlur={handleBlur}
                onChange={handleChange}
                rows={3}
                value={data.professionalSummary || ''}
              />
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}
              >
                <Typography
                  color={
                    data.professionalSummary?.length >= 100
                      ? 'error'
                      : 'text.secondary'
                  }
                  variant='caption'
                >
                  {data.professionalSummary?.length || 0}/100
                </Typography>
              </Box>
            </Grid>

            {isStudent && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={data.isAgeConfirmed || false}
                      name='isAgeConfirmed'
                      onChange={handleCheckboxChange}
                      size='small'
                      sx={{
                        color: errors.isAgeConfirmed
                          ? 'error.main'
                          : 'primary.main'
                      }}
                    />
                  }
                  label={
                    <Typography variant='body2'>
                      {t('common:labels.ageConfirmation')}
                    </Typography>
                  }
                />
                {errors.isAgeConfirmed && (
                  <FormHelperText error>
                    {t(errors.isAgeConfirmed)}
                  </FormHelperText>
                )}
              </Grid>
            )}
          </Grid>

          <Typography sx={styles.helperText} variant='caption'>
            {t('becomeTutor:generalInfo.helperText')}
          </Typography>
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
