import { useState } from 'react'
import { Box, Button } from '@mui/material'
import EmailVerificationModal from '~/components/email-verification-modal/EmailVerificationModal'

const DevModalTest = () => {
  const [open, setOpen] = useState(false)

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button onClick={() => setOpen(true)} variant='contained'>
        Відкрити модалку
      </Button>

      <EmailVerificationModal isOpen={open} onClose={() => setOpen(false)} />
    </Box>
  )
}

export default DevModalTest
