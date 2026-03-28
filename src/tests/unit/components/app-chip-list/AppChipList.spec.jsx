import { fireEvent, render, screen } from '@testing-library/react'
import { vi, afterEach, describe, it, expect } from 'vitest'

import AppChipList from '~/components/app-chips-list/AppChipList.tsx'

vi.mock('~/components/app-chip/AppChip', () => ({
  default: ({ children, handleDelete }) => (
    <div data-testid='test-chip'>
      {children}
      {handleDelete && (
        <button data-testid='delete-chip' onClick={handleDelete}>
          x
        </button>
      )}
    </div>
  )
}))

vi.mock('~/components/app-popover/AppPopover', () => ({
  default: ({ initialItems, showMoreElem }) => (
    <div data-testid='test-popover'>
      {initialItems}
      {showMoreElem}
    </div>
  )
}))

const defaultProps = {
  defaultQuantity: 2,
  items: ['item1', 'item2', 'item3', 'item4', 'item5'],
  handleChipDelete: vi.fn()
}

const renderComponent = (props = {}) => {
  return render(<AppChipList {...defaultProps} {...props} />)
}

describe('AppChipList tests', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should show chips', () => {
    renderComponent()
    const chips = screen.getAllByTestId('test-chip')
    expect(chips[0]).toBeInTheDocument()
  })

  it('should show chip with +3', () => {
    renderComponent()
    const chips = screen.getByTestId('amount-of-chips')
    expect(chips).toHaveTextContent('+3')
  })

  it('should show only 7 chips', () => {
    renderComponent({
      defaultQuantity: 7,
      items: ['1', '2', '3', '4', '5', '6', '7']
    })

    const chips = screen.getAllByTestId('test-chip')
    expect(chips).toHaveLength(7)

    const plusChip = screen.queryByTestId('amount-of-chips')
    expect(plusChip).not.toBeInTheDocument()
  })

  it('should show only 10 chips', () => {
    renderComponent({
      defaultQuantity: 10,
      items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    })

    const chips = screen.getAllByTestId('test-chip')
    expect(chips).toHaveLength(10)

    const plusChip = screen.queryByTestId('amount-of-chips')
    expect(plusChip).not.toBeInTheDocument()
  })

  it('should call delete handler when chip is clicked', () => {
    renderComponent()
    const deleteButtons = screen.getAllByTestId('delete-chip')

    fireEvent.click(deleteButtons[0])

    expect(defaultProps.handleChipDelete).toHaveBeenCalledTimes(1)
    expect(defaultProps.handleChipDelete).toHaveBeenCalledWith('item1')
  })
})
