import { useState, useEffect, useCallback, useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import useBreakpoints from '~/hooks/use-breakpoints'
import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { useStepContext } from '~/context/step-context'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'

import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from './SubjectsStep.styles'

const SubjectsStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { isMobile, isLaptopAndAbove } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()

  const selectedSubjects = useMemo(
    () => stepData[stepLabel] || [],
    [stepData, stepLabel]
  )

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [error, setError] = useState(null)

  const { loading: categoriesLoading, response: categories } =
    useCategoriesNames()

  const categoryId = selectedCategory?._id

  const {
    loading: subjectsLoading,
    response: subjects,
    fetchData: fetchSubjects
  } = useSubjectsNames({
    category: categoryId,
    fetchOnMount: false
  })

  useEffect(() => {
    if (!categoryId) {
      setSelectedSubject(null)
      return
    }

    void fetchSubjects()
  }, [categoryId, fetchSubjects])

  const handleAddSubject = useCallback(() => {
    if (!selectedCategory || !selectedSubject) {
      setError(t('becomeTutor.categories.emptyFields'))
      return
    }

    const alreadyExists = selectedSubjects.some(
      ({ _id }) => _id === selectedSubject._id
    )

    if (alreadyExists) {
      setError(t('becomeTutor.categories.sameSubject'))
      return
    }

    handleStepData(stepLabel, [...selectedSubjects, selectedSubject])
    setSelectedSubject(null)
    setError(null)
  }, [
    selectedCategory,
    selectedSubject,
    selectedSubjects,
    handleStepData,
    stepLabel,
    t
  ])

  const handleChipDelete = useCallback(
    (name) => {
      const subjectToRemove = selectedSubjects.find(
        (item) => item.name === name
      )

      if (!subjectToRemove) return

      handleStepData(
        stepLabel,
        selectedSubjects.filter((item) => item._id !== subjectToRemove._id)
      )
    },
    [handleStepData, selectedSubjects, stepLabel]
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}

      <Box sx={styles.rightBox}>
        <Box sx={styles.content}>
          <Typography sx={styles.titleDescription}>
            {t('becomeTutor.categories.title')}
          </Typography>

          {isMobile && (
            <Box sx={styles.imgWrapper}>
              <Box sx={styles.imgContainer}>
                <Box component='img' src={img} sx={styles.img} />
              </Box>
            </Box>
          )}

          <AppAutoComplete
            getOptionLabel={(option) => option?.name ?? ''}
            isOptionEqualToValue={(o, v) => o?._id === v?._id}
            loading={categoriesLoading}
            onChange={(_, value) => {
              setSelectedCategory(value)
              setSelectedSubject(null)
              setError(null)
            }}
            options={categories ?? []}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={selectedCategory}
          />

          <AppAutoComplete
            disabled={!selectedCategory}
            getOptionLabel={(option) => option?.name ?? ''}
            isOptionEqualToValue={(o, v) => o?._id === v?._id}
            loading={subjectsLoading}
            onChange={(_, value) => {
              setSelectedSubject(value)
              setError(null)
            }}
            options={subjects ?? []}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={selectedSubject}
          />

          <AppButton
            onClick={handleAddSubject}
            sx={styles.addSubjectButton}
            variant='outlined'
          >
            {t('becomeTutor.categories.btnText')}
          </AppButton>

          {error && <Typography sx={styles.errorText}>{error}</Typography>}

          {selectedSubjects.length > 0 && (
            <AppChipList
              defaultQuantity={2}
              handleChipDelete={handleChipDelete}
              items={selectedSubjects.map(({ name }) => name)}
              wrapperStyle={styles.chipsWrapper}
            />
          )}
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
