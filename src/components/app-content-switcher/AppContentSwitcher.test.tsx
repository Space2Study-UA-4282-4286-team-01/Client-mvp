import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AppContentSwitcher from './AppContentSwitcher'
import type { TooltipProps } from '@mui/material/Tooltip'

vi.mock('@mui/material/Tooltip', () => {
  return {
    default: ({ title, children }: Pick<TooltipProps, 'title' | 'children'>) => (
      <div>
        {children}
        {title && <span>{title}</span>}
      </div>
    )
  }
})

describe('AppContentSwitcher', () => {
  const switchOptions = {
    left: {
      text: 'Student',
      tooltip: 'Student tooltip'
    },
    right: {
      text: 'Tutor',
      tooltip: 'Tutor tooltip'
    }
  }

  it('should render with the correct props', () => {
    render(
      <AppContentSwitcher
        active={true}
        onChange={vi.fn()}
        switchOptions={switchOptions}
        typographyVariant='body1'
      />
    )

    expect(screen.getByText('Student')).toBeInTheDocument()
    expect(screen.getByText('Tutor')).toBeInTheDocument()
    expect(screen.getByTestId('switch')).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', () => {
  const onChange = vi.fn()

  render(
    <AppContentSwitcher
      active={false}
      onChange={onChange}
      switchOptions={switchOptions}
      typographyVariant='body1'
    />
  )

  fireEvent.click(screen.getByRole('checkbox'))

  expect(onChange).toHaveBeenCalledTimes(1)
})

  it('should render tooltips when tooltip props are passed', () => {
    render(
      <AppContentSwitcher
        active={true}
        onChange={vi.fn()}
        switchOptions={switchOptions}
        typographyVariant='body1'
      />
    )

    expect(screen.getByText('Student tooltip')).toBeInTheDocument()
    expect(screen.getByText('Tutor tooltip')).toBeInTheDocument()
  })
})
