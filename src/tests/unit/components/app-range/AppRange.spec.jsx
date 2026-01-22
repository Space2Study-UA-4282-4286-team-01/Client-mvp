import { expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AppRange from '~/components/app-range/AppRange'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: (fn) => fn
}))

describe('AppRange tests', () => {
  let mockProps = {
    min: 0,
    max: 100,
    onChange: vi.fn()
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should renders correctly', () => {
    render(<AppRange {...mockProps} />)
    const toText = screen.getByText('common.to')
    const fromText = screen.getByText('common.from')
    const inputRange = screen.getByRole('slider', { value: { now: 100 } })
    const [from, to] = screen.getAllByRole('textbox')
    expect(toText).toBeInTheDocument()
    expect(fromText).toBeInTheDocument()
    expect(inputRange).toBeInTheDocument()
    expect(from.value).toBe('0')
    expect(to.value).toBe('100')
  })

  it('should update range when props change', () => {
    const { rerender } = render(<AppRange {...mockProps} value={[10, 90]} />)
    rerender(<AppRange {...mockProps} value={[30, 70]} />)
    const [from, to] = screen.getAllByRole('textbox')
    expect(from.value).toBe('30')
    expect(to.value).toBe('70')
  })

  it('should call onChange when slider is moved', () => {
    render(<AppRange {...mockProps} />)
    const inputRange = screen.getByRole('slider', { value: { now: 100 } })
    fireEvent.change(inputRange, { target: { value: '50' } })
    expect(mockProps.onChange).toHaveBeenCalled()
  })

  it('should call onChange when input is changed', () => {
    render(<AppRange {...mockProps} />)
    const [from, to] = screen.getAllByRole('textbox')
    fireEvent.change(from, { target: { value: '10' } })
    expect(mockProps.onChange).toHaveBeenCalled()
    fireEvent.change(to, { target: { value: '40' } })
    expect(mockProps.onChange).toHaveBeenCalledTimes(2)
  })

  it('should not call onChange when input is changed with not a number', () => {
    render(<AppRange {...mockProps} />)
    const [from, to] = screen.getAllByRole('textbox')
    fireEvent.change(from, { target: { value: 'text' } })
    fireEvent.change(to, { target: { value: 'text' } })
    expect(mockProps.onChange).not.toHaveBeenCalled()
  })

  it('should call onChange with min number if input is empty', () => {
    render(<AppRange {...mockProps} />)
    const from = screen.getAllByRole('textbox')[0]
    fireEvent.change(from, { target: { value: '10' } })
    fireEvent.change(from, { target: { value: '' } })
    fireEvent.blur(from)
    expect(from.value).toBe('0')
    expect(mockProps.onChange).toHaveBeenCalledTimes(2)
  })

  it('should update prices when input is blurred and input is greater than max value', () => {
    render(<AppRange {...mockProps} />)
    const to = screen.getAllByRole('textbox')[1]
    fireEvent.change(to, { target: { value: '12345' } })
    fireEvent.blur(to)
    expect(to.value).toBe('100')
  })
})
