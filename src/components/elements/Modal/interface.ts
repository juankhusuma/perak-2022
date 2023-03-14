import { ReactNode } from 'react'

export interface ModalProps {
  className?: string
  icon?: any
  title?: string
  message?: string | JSX.Element
  onClose?: () => void
  onOpen?: () => void
  isOpen?: boolean
  primary?: string
  primaryClicked?: () => void
  secondary?: string
  secondaryClicked?: () => void
  variant?: number
  canClose?: boolean
  primaryButtonClassname?: string
  secondaryButtonClassname?: string
  exitCross?: string
}
