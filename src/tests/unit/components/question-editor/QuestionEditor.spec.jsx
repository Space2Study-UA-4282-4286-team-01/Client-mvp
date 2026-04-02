import { render, fireEvent, screen } from '@testing-library/react'
import { afterEach, beforeEach, it, vi } from 'vitest'

import QuestionEditor from '~/components/question-editor/QuestionEditor'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

vi.mock('~/hooks/use-menu', () => ({
  default: () => ({
    openMenu: vi.fn(),
    closeMenu: vi.fn(),
    renderMenu: vi.fn((children) => children)
  })
}))

vi.mock('~/components/app-select/AppSelect', () => ({
  default: ({ value, setValue, fields }) => (
    <select
      data-testid='app-select'
      onChange={(e) => setValue(e.target.value)}
      value={value}
    >
      {fields.map((field) => (
        <option key={field.value} value={field.value}>
          {field.title}
        </option>
      ))}
    </select>
  )
}))

const mockProps = {
  data: {
    type: 'openAnswer',
    text: 'Initial Question',
    answers: [{ id: 0, text: 'Answer 1', isCorrect: false }],
    openAnswer: 'Initial Open Answer'
  },
  handleInputChange: vi.fn(() => vi.fn()),
  handleNonInputValueChange: vi.fn(),
  onEdit: vi.fn(),
  onSave: vi.fn(),
  isQuizQuestion: true
}

describe('QuestionEditor test', () => {
  beforeEach(() => {
    render(<QuestionEditor {...mockProps} />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('it should renders question input field', () => {
    const questionInput = screen.getByRole('textbox', {
      name: /questionPage.question/i
    })
    expect(questionInput).toBeInTheDocument()
  })

  it('it should renders a open answer', () => {
    const openAnswer = screen.getByLabelText(/questionPage.answer/i)
    expect(openAnswer).toBeInTheDocument()
  })

  it('it should change question type', async () => {
    const questionTypeSelect = screen.getByTestId('app-select')
    fireEvent.change(questionTypeSelect, {
      target: { value: 'multipleChoice' }
    })
    expect(mockProps.handleNonInputValueChange).toHaveBeenCalledWith(
      'type',
      'multipleChoice'
    )
  })

  it('it should change question and answer input fields', async () => {
    const questionInput = screen.getByLabelText(/questionPage.question/i)
    fireEvent.change(questionInput, { target: { value: 'New Question Text' } })
    expect(mockProps.handleInputChange).toHaveBeenCalledWith('text')

    const { rerender } = render(<QuestionEditor {...mockProps} />)

    rerender(
      <QuestionEditor
        {...mockProps}
        data={{
          ...mockProps.data,
          type: 'multipleChoice',
          answers: [{ id: 0, text: '', isCorrect: false }]
        }}
      />
    )

    const answerInput = screen.getByPlaceholderText(
      /questionPage.writeYourAnswer/i
    )
    fireEvent.change(answerInput, { target: { value: 'New Option' } })
    expect(mockProps.handleNonInputValueChange).toHaveBeenCalledWith(
      'answers',
      expect.any(Array)
    )
  })

  it('it should click on edit title and category', () => {
    const editMenuItem = screen.getByText(
      /myResourcesPage.questions.titleWithCategory/i
    )
    fireEvent.click(editMenuItem)
    expect(mockProps.onEdit).toHaveBeenCalled()
  })
})
