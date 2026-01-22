import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { CategoryCard } from '~/components/category-card/CategoryCard'
import { UserRoleEnum } from '~/types'

const mockCategory = {
  name: 'Math',
  appearance: {
    color: '#1976d2',
    icon: 'home'
  },
  totalOffers: {
    student: 12,
    tutor: 5
  }
}

describe('CategoryCard', () => {
  it('renders category name', () => {
    render(<CategoryCard category={mockCategory} role={UserRoleEnum.Student} />)

    expect(screen.getByText('Math')).toBeInTheDocument()
  })

  it('shows tutor offers when role is Tutor', () => {
    render(<CategoryCard category={mockCategory} role={UserRoleEnum.Tutor} />)

    expect(screen.getByText(`5 ${UserRoleEnum.Tutor}`)).toBeInTheDocument()
  })
})
