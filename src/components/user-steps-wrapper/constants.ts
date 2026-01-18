import { nameField } from '~/utils/validations/common'

export const initialValues = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  professionalSummary: '',
  isAgeConfirmed: false // Додаємо це поле, воно потрібне для студента
}

export const validations = {
  firstName: nameField,
  lastName: nameField
}

export const tutorStepLabels = ['generalInfo', 'subjects', 'language', 'photo']

export const studentStepLabels = [
  'generalInfo',
  'subjects',
  'language',
  'photo'
]
