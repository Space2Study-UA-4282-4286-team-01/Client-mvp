import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import useBreakpoints from '~/hooks/use-breakpoints'
import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from './SubjectsStep.styles'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove } = useBreakpoints()

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)

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

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}

      <Box sx={styles.rightBox}>
        <Box sx={styles.content}>
          <Typography sx={styles.title}>
            {t('becomeTutor.categories.title')}
          </Typography>

          <AppAutoComplete
            getOptionLabel={(option) => option?.name ?? ''}
            isOptionEqualToValue={(o, v) => o?._id === v?._id}
            loading={categoriesLoading}
            onChange={(_, value) => {
              setSelectedCategory(value)
              setSelectedSubject(null)
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
            }}
            options={subjects ?? []}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={selectedSubject}
          />
        </Box>

        <Box>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
