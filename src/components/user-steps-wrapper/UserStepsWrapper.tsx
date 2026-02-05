import { FC, useEffect } from 'react'
import { useAppDispatch } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import {
  tutorStepLabels,
  studentStepLabels,
  initialValues
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'

interface UserStepsWrapperProps {
  userRole: string
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const dispatch = useAppDispatch()
  const isStudent = userRole === student

  const currentInitialValues = {
    ...initialValues,
    isAgeConfirmed: !isStudent
  }

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const stepLabels = isStudent ? studentStepLabels : tutorStepLabels

  const childrenArr = [
    <GeneralInfoStep btnsBox={null} isStudent={isStudent} key='1' />,
    <SubjectsStep btnsBox={null} key='2' />,
    <LanguageStep btnsBox={null} key='3' />,
    <AddPhotoStep btnsBox={null} key='4' />
  ]

  return (
    <StepProvider initialValues={currentInitialValues} stepLabels={stepLabels}>
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
