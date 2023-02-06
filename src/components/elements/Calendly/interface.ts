import { ReactNode } from 'react'

export interface CalendlyProps {
  onClose?: () => void
  isOpen?: boolean
  canClose?: boolean
  url: string
}
