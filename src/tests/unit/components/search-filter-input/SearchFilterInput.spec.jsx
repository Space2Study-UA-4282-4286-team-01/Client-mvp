import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str) => str
  })
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )
}))

vi.mock('~/components/input-with-icon/InputWithIcon', () => ({
  default: ({ value, onChange, onClear, onKeyPress, placeholder }) => (
    <div>
      <input
        onChange={onChange}
        onKeyDown={onKeyPress}
        placeholder={placeholder}
        value={value}
      />
      <button aria-label='Clear' onClick={onClear}>
        Clear
      </button>
    </div>
  )
}))

describe('SearchFilterInput', () => {
  const mockUpdateFilter = vi.fn()
  const textFieldProps = {
    placeholder: 'Search...'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    render(
      <SearchFilterInput
        textFieldProps={textFieldProps}
        updateFilter={mockUpdateFilter}
      />
    )
  })

  it('should render component with input in it', () => {
    const input = screen.getByPlaceholderText('Search...')
    expect(input).toBeInTheDocument()

    const searchButton = screen.getByText('common.search')
    expect(searchButton).toBeInTheDocument()
  })

  it('should render typed text correctly', () => {
    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'Hello World' } })
    expect(input.value).toBe('Hello World')
  })

  it('should delete typed text when delete button is clicked', () => {
    const input = screen.getByPlaceholderText('Search...')

    fireEvent.change(input, { target: { value: 'Text to delete' } })
    expect(input.value).toBe('Text to delete')

    const clearButton = screen.getByLabelText('Clear')
    fireEvent.click(clearButton)
    expect(input.value).toBe('')
    expect(mockUpdateFilter).toHaveBeenCalledWith('')
  })

  it('should call updateFilter function on search button click', () => {
    const input = screen.getByPlaceholderText('Search...')
    const searchButton = screen.getByText('common.search')
    fireEvent.change(input, { target: { value: 'Search text' } })
    fireEvent.click(searchButton)
    expect(mockUpdateFilter).toHaveBeenCalledWith('Search text')
  })

  it('should call updateFilter function when enter is pressed', () => {
    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'React' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(mockUpdateFilter).toHaveBeenCalledWith('React')
  })
})
