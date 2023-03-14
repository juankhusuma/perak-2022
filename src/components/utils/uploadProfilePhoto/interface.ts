import { AxiosProgressEvent } from 'axios'

export interface UploadProfilePhotoProps {
  file: File | undefined
  userId: String
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}
