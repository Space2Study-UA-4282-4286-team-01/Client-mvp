import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import styles from '~/containers/guest-home-page/signup-dialog/SignUpDialog.styles'
import SignUpForm from '~/containers/guest-home-page/signup-form/SignUpForm'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'

const SignUpDialog = ({ userRole }) => {
  const images = { student: studentImg, tutor: tutorImg }
  const signUpImg = images[userRole]

  const { t } = useTranslation()

  const handleBlur = () => {}
  const handleInputChange = () => {}
  const handleSubmit = () => {}
  const data = { email: '', password: '' }
  const errors = { email: '', password: '' }

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
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpDialog
