import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import HashLink from '~/components/hash-link/HashLink'

import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleSearch = (search: string) => {
    navigate({
      pathname: authRoutes.findOffers.path,
      search: search ? `?search=${search}` : ''
    })
  }

  return (
    <PageWrapper>
      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />
      <Box sx={styles.searchWrapper}>
        <Typography
          component={HashLink}
          sx={styles.showAllOffers}
          to={authRoutes.findOffers.path}
        >
          {t('categoriesPage.showAllOffers')}
          <ArrowForwardIcon fontSize='small' />
        </Typography>
        <SearchFilterInput
          sx={styles.searchField}
          textFieldProps={{
            placeholder: t('categoriesPage.searchLabel')
          }}
          updateFilter={handleSearch}
        />
      </Box>
      <Typography sx={styles.footerText} variant='body2'>
        {t('categoriesPage.questionFind')} {t('categoriesPage.request')}{' '}
        <Typography
          component={HashLink}
          sx={styles.footerLinks}
          to={'#'}
          variant='body2'
        >
          {t('categoriesPage.category')}
        </Typography>{' '}
        {t('categoriesPage.or')}{' '}
        <Typography
          component={HashLink}
          sx={styles.footerLinks}
          to={'#'}
          variant='body2'
        >
          {t('categoriesPage.subject')}
        </Typography>
        .
      </Typography>
    </PageWrapper>
  )
}

export default Categories
