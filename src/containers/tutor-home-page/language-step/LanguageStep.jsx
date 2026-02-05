import { useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { createFilterOptions } from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import useBreakpoints from '~/hooks/use-breakpoints'
import { useStepContext } from '~/context/step-context'
import { tutorStepLabels } from '~/components/user-steps-wrapper/constants'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { LanguagesEnum } from '~/types'
import { styles } from './LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

const INITIAL_VISIBLE_COUNT = 6
const LOAD_MORE_COUNT = 6
const LANGUAGES = Object.values(LanguagesEnum)

const LanguageStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { t } = useTranslation()

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

  const languageLabel = tutorStepLabels[2]
  const selectedValue = stepData[languageLabel] || ''

  const languageOptions = useMemo(
    () =>
      LANGUAGES.map((value) => ({
        value,
        label: t(`common.languages.${value.toLowerCase()}`)
      })),
    [t]
  )

  const filterOptions = useCallback(
    (options, state) => {
      const filtered = createFilterOptions()(options, state)
      return filtered.slice(0, visibleCount)
    },
    [visibleCount]
  )

  const selectedLanguage = useMemo(
    () => languageOptions.find(({ value }) => value === selectedValue) ?? null,
    [languageOptions, selectedValue]
  )

  const handleLanguageChange = (_, option) => {
    handleStepData(languageLabel, option?.value ?? '')
  }

  const handleInputChange = (_, __, reason) => {
    if (reason === 'input') {
      setVisibleCount(INITIAL_VISIBLE_COUNT)
    }
  }

  const handleScroll = useCallback(
    (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget

      if (
        scrollHeight - scrollTop - clientHeight < 50 &&
        visibleCount < languageOptions.length
      ) {
        setVisibleCount((prev) =>
          Math.min(prev + LOAD_MORE_COUNT, languageOptions.length)
        )
      }
    },
    [visibleCount, languageOptions.length]
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}

      <Box sx={styles.rigthBox}>
        <Box>
          <Typography
            sx={{ mb: 2, lineHeight: '120%' }}
            variant={isMobile ? 'body2' : 'subtitle1'}
          >
            {t('becomeTutor.languages.title')}
          </Typography>

          {isMobile && (
            <Box sx={styles.imgContainer}>
              <Box component='img' src={img} sx={styles.img} />
            </Box>
          )}

          <AppAutoComplete
            ListboxProps={{
              onScroll: handleScroll,
              style: { maxHeight: 200 }
            }}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.label ?? ''}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={handleLanguageChange}
            onInputChange={handleInputChange}
            options={languageOptions}
            textFieldProps={{
              label: t('becomeTutor.languages.autocompleteLabel')
            }}
            value={selectedLanguage}
          />
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
