import { Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'
import { FC } from 'react'
import { ICONS_MAP } from '~/constants/icons'
import { CategoryInterface, UserRole, UserRoleEnum } from '~/types'
import { alpha } from '@mui/material/styles'
import { styles } from './CategoryCard.styles'

interface CategoryCardProps {
  category: CategoryInterface
  role: UserRole | ''
}

export const CategoryCard: FC<CategoryCardProps> = ({ category, role }) => {
  const IconComponent =
    ICONS_MAP[
      category.appearance.icon.toLowerCase() as keyof typeof ICONS_MAP
    ] || ICONS_MAP.default
  const isUserStudent = role === UserRoleEnum.Student
  const totalOffers = isUserStudent
    ? `${category.totalOffers.student} ${UserRoleEnum.Student}`
    : `${category.totalOffers.tutor} ${UserRoleEnum.Tutor}`

  return (
    <Box sx={styles.cardContainer}>
      <Box sx={styles.iconContainer}>
        <Box sx={styles.iconWrapper(alpha(category.appearance.color, 0.12))}>
          <IconComponent
            sx={{ color: category.appearance.color, width: 40, height: 40 }}
          />
        </Box>
      </Box>
      <Box sx={styles.textContainer}>
        <Typography component='div' sx={styles.categoryName} variant='h6'>
          {category.name}
        </Typography>
        <Typography component='div' sx={styles.total}>
          {totalOffers}
        </Typography>
      </Box>
    </Box>
  )
}
