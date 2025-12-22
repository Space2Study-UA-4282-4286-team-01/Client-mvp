import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str
    }
  }
}))
