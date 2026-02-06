import React from 'react'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { styles } from './EmailVerificationModal.styles'
import VerificationImage from '~/assets/img/email-verification-modal/icons8-info-50.svg?url'

interface EmailVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const { t } = useTranslation()

  return (
    <Modal
      onClose={onClose}
      open={isOpen}
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        p: 0
      }}
    >
      <Box sx={styles.container}>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>

        <Box sx={styles.imageWrapper}>
          <img
            alt='Verification'
            src={VerificationImage}
            style={{ height: '100%', objectFit: 'contain', width: '100%' }}
          />
        </Box>

        <Typography sx={styles.title} variant='h5'>
          {t('emailVerification.title', 'Перевірка Email')}
        </Typography>

        <Typography sx={styles.description} variant='body1'>
          {t(
            'emailVerification.description',
            'Ми надіслали лист для підтвердження вашої електронної пошти.'
          )}
        </Typography>

        <Button
          onClick={onConfirm || onClose}
          size='large'
          sx={styles.actionButton}
          variant='contained'
        >
          {t('emailVerification.button', 'Ok')}
        </Button>
      </Box>
    </Modal>
  )
}

export default EmailVerificationModal
