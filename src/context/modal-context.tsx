import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { PaperProps } from '@mui/material/Paper'
import { ConfirmDialogProps } from '~/components/confirm-dialog/ConfirmDialog'

type ConfirmDialogControlledProps = 'open' | 'onConfirm' | 'onDismiss'

export interface ConfirmOnCloseConfig<
  P extends Omit<ConfirmDialogProps, ConfirmDialogControlledProps> = Omit<
    ConfirmDialogProps,
    ConfirmDialogControlledProps
  >
> {
  component: FC<P & Pick<ConfirmDialogProps, ConfirmDialogControlledProps>>
  props: P
}

interface Component {
  component: React.ReactElement
  paperProps?: PaperProps
  confirmOnClose?: ConfirmOnCloseConfig
}

interface ModalProvideContext {
  openModal: (component: Component, delayToClose?: number) => void
  closeModal: () => void
  setModalOnCross: (action: (() => void) | null) => void
}

interface ModalProviderProps {
  children: React.ReactElement
}

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<React.ReactElement | null>(null)
  const [paperProps, setPaperProps] = useState<PaperProps>({})
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [confirmOnClose, setConfirmOnClose] =
    useState<ConfirmOnCloseConfig | null>(null)

  const [onCrossClick, setOnCrossClick] = useState<(() => void) | null>(null)

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
    setConfirmOnClose(null)
    setTimer(null)
  }, [setModal, setPaperProps, setConfirmOnClose, setTimer])

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    (
      { component, paperProps, confirmOnClose }: Component,
      delayToClose?: number
    ) => {
      setModal(component)
      paperProps && setPaperProps(paperProps)
      setConfirmOnClose(confirmOnClose ?? null)
      delayToClose && closeModalAfterDelay(delayToClose)
    },
    [setModal, setPaperProps, setConfirmOnClose, closeModalAfterDelay]
  )

  const setModalOnCross = useCallback((action: (() => void) | null) => {
    setOnCrossClick(() => action)
  }, [])

  const contextValue = useMemo(
    () => ({ openModal, closeModal, setModalOnCross }),
    [closeModal, openModal, setModalOnCross]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <PopupDialog
          closeModalAfterDelay={closeModalAfterDelay}
          confirmOnClose={confirmOnClose}
          content={modal}
          onCrossClick={onCrossClick}
          paperProps={paperProps}
          timerId={timer}
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
