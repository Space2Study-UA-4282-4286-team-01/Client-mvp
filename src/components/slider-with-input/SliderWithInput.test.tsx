import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import SliderWithInput from './SliderWithInput'

vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: <T extends (...args: unknown[]) => void>(fn: T) => fn
}))

vi.mock('@mui/material/Slider', () => ({
  default: (props: {
    value: number
    onChange: (event: Event, value: number) => void
  }) => (
    <input
      type="range"
      data-testid="slider"
      value={props.value}
      onChange={(e) =>
        props.onChange(e as unknown as Event, Number(e.target.value))
      }
    />
  )
}))

vi.mock('@mui/material/TextField', () => ({
  default: (props: {
    value: string | number
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur: React.FocusEventHandler<HTMLInputElement>
  }) => (
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
    fireEvent.blur(input)

    expect(onChangeMock).toHaveBeenCalledWith(0)
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
    expect(onChangeMock).toHaveBeenCalledWith(100)
  })
})

