import { AppProps } from 'next/app'
import { type } from 'os'

export interface AuthModalProps {
  icon?: any
  title?: string
  message?: string
  onClose?: () => void
  isOpen?: boolean
  canClose?: boolean
}
