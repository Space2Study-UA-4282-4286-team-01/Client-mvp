import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import SliderWithInput from './SliderWithInput'

vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: (fn: any) => fn
}))

vi.mock('~/utils/range-filter', () => ({
  checkNumberIsInRange: ({ inputValue, min, max }: any) => {
    if (inputValue === null || isNaN(inputValue)) return min
    if (inputValue > max) return max
    if (inputValue < min) return min
    return inputValue
  },
  createMarks: () => []
}))

vi.mock('@mui/material/Slider', () => ({
  default: (props: any) => (
    <input
      type="range"
      data-testid="slider"
      value={props.value}
      onChange={(e) => props.onChange(e, Number(e.target.value))}
    />
  )
}))

vi.mock('@mui/material/TextField', () => ({
  default: (props: any) => (
    <input
      data-testid="input"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  )
}))

describe('SliderWithInput', () => {
  const onChangeMock = vi.fn()

  const defaultProps = {
    defaultValue: 50,
    title: 'Price',
    min: 0,
    max: 100,
    onChange: onChangeMock
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    render(<SliderWithInput {...defaultProps} />)

    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByTestId('slider')).toBeInTheDocument()
    expect(screen.getByTestId('input')).toBeInTheDocument()
  })

  it('calls onChange when slider is moved', () => {
    render(<SliderWithInput {...defaultProps} />)

    fireEvent.change(screen.getByTestId('slider'), {
      target: { value: '70' }
    })

    expect(onChangeMock).toHaveBeenCalledWith(70)
  })

  it('updates inputValue correctly when input value is empty', () => {
    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { value: '' } })

    expect(input).toHaveValue('')
  })

  it('does not update prices when input is blurred and value has not changed', () => {
    render(<SliderWithInput {...defaultProps} />)

    fireEvent.blur(screen.getByTestId('input'))

    expect(onChangeMock).not.toHaveBeenCalled()
  })

  it('updates prices when input is blurred and input is greater than max value', () => {
    render(<SliderWithInput {...defaultProps} />)

    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { value: '150' } })
    fireEvent.blur(input)

    expect(input).toHaveValue('100')
  })
})

