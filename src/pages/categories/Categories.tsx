import { Box } from '@mui/material'
import { useCallback } from 'react'
import { CategoryCard } from '~/components/categoryCard/CategoryCard'
import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import useAxios from '~/hooks/use-axios'
import { useAppSelector } from '~/hooks/use-redux'
import { categoryService } from '~/services/category-service'
import { CategoryInterface, ItemsWithCount } from '~/types'

const Categories = () => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const serviceFunction = useCallback(() => categoryService.getCategories(), [])

  const { response, loading } = useAxios<ItemsWithCount<CategoryInterface>>({
    service: serviceFunction,
    defaultResponse: { items: [], count: 0 }
  })

  return (
    <PageWrapper>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        fontSize={24}
        fontWeight={600}
        gap={2}
        mb={2}
      >
        {loading ? (
          <Loader size={20} sx={{ color: 'primary.600' }} />
        ) : (
          response.items.map((item) => (
            <CategoryCard category={item} key={item._id} role={userRole} />
          ))
        )}
      </Box>
    </PageWrapper>
  )
}

export default Categories
