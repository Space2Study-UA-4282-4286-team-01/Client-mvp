import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import styles from '~/containers/guest-home-page/signup-dialog/SignUpDialog.styles'
import SignUpForm from '~/containers/guest-home-page/signup-form/SignUpForm'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import { signup } from '~/constants'
import { ChangeEvent } from 'react'

const SignUpDialog = ({ userRole }: { userRole: string }) => {
  const images: { [key: string]: string } = {
    student: studentImg,
    tutor: tutorImg
  }
  const signUpImg: string = images[userRole]

  const { t } = useTranslation()

  const handleInputChange =
    (field: string) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log(field, event.target.value)
    }
  const handleSubmit = () => {}
  const data = {}
  const errors = {}

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box alt='signup' component='img' src={signUpImg} sx={styles.img} />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t(`signup.head.${userRole}`)}
        </Typography>
        <Box sx={styles.form}>
          <SignUpForm
            data={data}
            errors={errors}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <GoogleLogin
            buttonWidth={styles.form.maxWidth}
            role={undefined}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpDialog
