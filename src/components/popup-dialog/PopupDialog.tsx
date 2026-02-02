import { FC, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { PaperProps } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'

import { ConfirmOnCloseConfig, useModalContext } from '~/context/modal-context'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: PaperProps
  timerId: NodeJS.Timeout | null
  closeModalAfterDelay: (delay?: number) => void
  confirmOnClose: ConfirmOnCloseConfig | null
}

const PopupDialog: FC<PopupDialogProps> = ({
  content,
  paperProps,
  timerId,
  closeModalAfterDelay,
  confirmOnClose
}) => {
  const { isMobile } = useBreakpoints()
  const { closeModal } = useModalContext()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()

  const handleCloseClick = () => {
    if (confirmOnClose) {
      setShowConfirm(true)
    } else {
      closeModal()
    }
  }
  const handleConfirm = () => {
    setShowConfirm(false)
    closeModal()
  }
  const handleCancel = () => setShowConfirm(false)

  const handleIconClose = () => {
    if (onCrossClick) {
      onCrossClick()
    } else {
      closeModal()
    }
  }

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      onClose={closeModal}
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        <IconButton onClick={handleCloseClick} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
        {confirmOnClose && showConfirm && (
          <confirmOnClose.component
            {...confirmOnClose.props}
            onConfirm={handleConfirm}
            onDismiss={handleCancel}
            open={showConfirm}
          />
        )}
      </Box>
    </Dialog>
  )
}

export default PopupDialog
