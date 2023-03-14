import { AxiosProgressEvent } from 'axios'

export interface UploadPaymentReceiptProps {
  file: File | undefined
  userId: String
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}
